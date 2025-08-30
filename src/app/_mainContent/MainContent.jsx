"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import projectsData from "../_data/projects.json";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const MainContent = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [zoom, setZoom] = useState(1);

    const handleZoom = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            setZoom((z) => Math.min(z + 0.2, 3)); // zoom in
        } else {
            setZoom((z) => Math.max(z - 0.2, 1)); // zoom out
        }
    };

    const openModal = (category, index) => {
        setSelectedCategory(category);
        setSelectedIndex(index);
        setSelectedImageIndex(0);
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setSelectedIndex(null);
        setSelectedImageIndex(0);
    };

    const currentProject =
        selectedCategory && selectedIndex !== null
            ? projectsData[selectedCategory][selectedIndex]
            : null;

    const nextImage = () => {
        if (currentProject && selectedImageIndex < currentProject.images.length - 1) {
            setSelectedImageIndex((prev) => prev + 1);
        }
    };

    const prevImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex((prev) => prev - 1);
        }
    };

    const nextProject = () => {
        const projects = projectsData[selectedCategory];
        if (selectedIndex < projects.length - 1) {
            setSelectedIndex((prev) => prev + 1);
            setSelectedImageIndex(0);
        }
    };

    const prevProject = () => {
        if (selectedIndex > 0) {
            setSelectedIndex((prev) => prev - 1);
            setSelectedImageIndex(0);
        }
    };
    useEffect(() => {
        if (currentProject) {
            document.body.style.overflow = "hidden"; // disable body scroll
        } else {
            document.body.style.overflow = "auto"; // restore
        }
    }, [currentProject]);

    return (
        <>
            <div className={styles.main}>

                <header>
                    <h1>WORK BY KEVAL GOHIL</h1>
                    <a href="https://kval.vercel.app" target="_blank">- kval.vercel.app -</a>
                </header>

                {Object.entries(projectsData).map(([category, projects]) => (
                    <div key={category} className={styles.section}>
                        <h2>{category}</h2>

                        <div className={styles.grid}>
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className={styles.card}
                                    onClick={() => openModal(category, index)}
                                >
                                    <Image
                                        src={project.images[0]}
                                        alt={project.name}
                                        width={400}
                                        height={250}
                                        className={styles.cardImage}
                                    />
                                    <h5 className={styles["card-title"]}>{project.name}</h5>
                                    <p className={styles["card-text"]}>{project.description}</p>

                                    {project.link && project.linkLabel ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={styles.projectLink}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {project.linkLabel}
                                        </a>
                                    ) : (
                                        <span className={styles.noLink}>{project.linkLabel}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}


                <footer>
                    <h3>That’s all from me — thanks for taking the time to explore my work!</h3>
                </footer>
            </div>

            {currentProject && (
                <div className={styles.modalBackdrop}>
                    <button onClick={closeModal} className={styles.closeBtn}>
                        ✕
                    </button>
                    <div className={styles.modalContent}>

                        <div className={styles.modalImageWrapper}>
                            <TransformWrapper
                                minScale={1}
                                maxScale={4}
                                wheel={{ step: 0.2 }}
                                doubleClick={{ disabled: true }}
                                centerOnInit={true}   // 👈 ensures centered at start
                            >
                                {({ resetTransform }) => (
                                    <TransformComponent
                                        wrapperStyle={{ width: "100%", maxHeight: "80vh", overflow: "auto" }}
                                        contentStyle={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                    >

                                        <Image
                                            src={currentProject.images[selectedImageIndex]}
                                            alt={currentProject.name}
                                            width={1200}
                                            height={800}
                                            className={styles.modalImage}
                                            onLoad={() => resetTransform()} // 👈 reset scale when image changes
                                        />
                                    </TransformComponent>
                                )}
                            </TransformWrapper>

                        </div>

                        <div className={styles.imgNav}>
                            <button onClick={prevImage} disabled={selectedImageIndex === 0}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.328 11v2H7.5l3.243 3.243l-1.415 1.414L3.672 12l5.656-5.657l1.415 1.414L7.5 11z" /></svg></button>
                            <button onClick={nextImage} disabled={selectedImageIndex === currentProject.images.length - 1}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m15.038 6.343l-1.411 1.418l3.27 3.255l-13.605.013l.002 2l13.568-.013l-3.215 3.23l1.417 1.41l5.644-5.67z" /></svg></button>
                        </div>

                        <h5 className={styles.underline}>{currentProject.name}</h5>
                        <p className={styles.underline}>{currentProject.description}</p>
                        {currentProject.link && currentProject.linkLabel ? (
                            <a
                                href={currentProject.link}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.projectLink}
                            >
                                {currentProject.linkLabel}
                            </a>
                        ) : (
                            <span className={styles.noLink}>{currentProject.linkLabel}</span>
                        )}

                        <div className={styles.projectNav}>
                            <button onClick={prevProject} disabled={selectedIndex === 0}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.328 11v2H7.5l3.243 3.243l-1.415 1.414L3.672 12l5.656-5.657l1.415 1.414L7.5 11z" /></svg>
                                Prev Project
                            </button>
                            <button onClick={nextProject} disabled={selectedIndex === projectsData[selectedCategory].length - 1}>
                                Next Project
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m15.038 6.343l-1.411 1.418l3.27 3.255l-13.605.013l.002 2l13.568-.013l-3.215 3.23l1.417 1.41l5.644-5.67z" /></svg>
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default MainContent;
