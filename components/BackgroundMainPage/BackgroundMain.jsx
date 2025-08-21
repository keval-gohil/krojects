'use client';
import React, { useEffect } from 'react';
import styles from './style.module.css';
import BackgroundContent from './BackgroundContent';

const MIN_SPEED = 1.5;
const MAX_SPEED = 2.5;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

class Blob {
  constructor(el) {
    this.el = el;
    const boundingRect = this.el.getBoundingClientRect();
    this.size = boundingRect.width;
    this.initialX = randomNumber(0, window.innerWidth - this.size);
    this.initialY = randomNumber(0, window.innerHeight - this.size);
    this.el.style.top = `${this.initialY}px`;
    this.el.style.left = `${this.initialX}px`;
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.x = this.initialX;
    this.y = this.initialY;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size;
      this.vx *= -1;
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size;
      this.vy *= -1;
    }
    if (this.x <= 0) {
      this.x = 0;
      this.vx *= -1;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.vy *= -1;
    }
  }

  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${this.y - this.initialY
      }px)`;
  }
}

function BackgroundMain() {
  useEffect(() => {
    const blobEls = document.querySelectorAll(`.${styles['bouncing-blob']}`);
    const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl));

    function update() {
      requestAnimationFrame(update);
      blobs.forEach((blob) => {
        blob.update();
        blob.move();
      });
    }

    requestAnimationFrame(update);

    return () => cancelAnimationFrame(update);
  }, []);

  return (
    <>
      <div className={`${styles['bouncing-blobs-container']}`}>
        <div className={`${styles['bouncing-blobs-glass']}`}></div>
        <div className={`${styles['bouncing-blobs']}`}>
          <div className={`${styles['bouncing-blob']} ${styles['bouncing-blob--blue']}`}></div>
          <div className={`${styles['bouncing-blob']} ${styles['bouncing-blob--blue']}`}></div>
          <div className={`${styles['bouncing-blob']} ${styles['bouncing-blob--blue']}`}></div>
          <div className={`${styles['bouncing-blob']} ${styles['bouncing-blob--white']}`}></div>
          <div className={`${styles['bouncing-blob']} ${styles['bouncing-blob--purple']}`}></div>
          <div className={`${styles['bouncing-blob']} ${styles['bouncing-blob--purple']}`}></div>
          <div className={`${styles['bouncing-blob']} ${styles['bouncing-blob--pink']}`}></div>
        </div>
      </div>


      <BackgroundContent />
    </>
  );
}

export default BackgroundMain;
