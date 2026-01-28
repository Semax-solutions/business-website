import { useEffect, useRef } from "react"
import classes from "./SpinningLogo.module.css"

const SpinningLogo = () => {
  const logoRef = useRef<HTMLImageElement | null>(null)
  const rotation = useRef(0)
  const velocity = useRef(0)
  const animationFrame = useRef<number | null>(null)
  const idleTimeout = useRef<number | null>(null)

  const FRICTION = 0.95           // slows down over time
  const CLICK_POWER = 10           // speed added per click
  const IDLE_SPEED = 0.5           // slow spin when idle
  const IDLE_DELAY = 1000          // 2 seconds of inactivity

  const animate = () => {
    velocity.current *= FRICTION
    rotation.current += velocity.current

    if (logoRef.current) {
      logoRef.current.style.transform = `rotate(${rotation.current}deg)`
    }

    // Continue animation if moving
    if (Math.abs(velocity.current) > 0.01) {
      animationFrame.current = requestAnimationFrame(animate)
    } else {
      velocity.current = 0
      animationFrame.current = null
    }
  }

  const startIdleSpin = () => {
    velocity.current = IDLE_SPEED
        const animateToZero = () => {
        // Calculate the difference to 0
        const diff = 0 - rotation.current

        // Move a fraction toward 0 each frame
        rotation.current += diff * 0.1

        if (logoRef.current) {
            logoRef.current.style.transform = `rotate(${rotation.current}deg)`
        }

        // Continue until rotation is almost 0
        if (Math.abs(rotation.current) > 0.5) {
        animationFrame.current = requestAnimationFrame(animateToZero)
        } else {
        rotation.current = 0
        animationFrame.current = null
        }
    }

    if (!animationFrame.current) animateToZero()
  }

  const handleClick = () => {
    // Add spin on click
    velocity.current += CLICK_POWER
    if (!animationFrame.current) animate()

    // Reset idle timer
    if (idleTimeout.current) clearTimeout(idleTimeout.current)
    idleTimeout.current = setTimeout(startIdleSpin, IDLE_DELAY)
  }

  useEffect(() => {
    // Start idle spin at beginning
    idleTimeout.current = setTimeout(startIdleSpin, IDLE_DELAY)

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current)
      }
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current)
      }
    }
  }, [])

  return (
    <img
      ref={logoRef}
      src="/Semax_Logo.svg"
      alt="Semax Logo"
      className={classes.logo}
      onClick={handleClick}
    />
  )
}

export default SpinningLogo
