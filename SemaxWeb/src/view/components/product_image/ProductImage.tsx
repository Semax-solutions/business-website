import { useState } from 'react';
import classes from './ProductImage.module.css';

interface ProductImageProps {
    src: string;
    alt: string;
    className?: string;
}

/** Image that shows a branded placeholder until the real screenshot is added. */
const ProductImage = ({ src, alt, className }: ProductImageProps) => {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className={`${classes.placeholder} ${className ?? ''}`} role="img" aria-label={alt}>
                <div className={classes.browserBar}>
                    <span /><span /><span />
                </div>
                <div className={classes.mock}>
                    <div className={classes.mockChart}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <i key={i} style={{ height: `${30 + ((i * 37) % 60)}%` }} />
                        ))}
                    </div>
                    <p className={classes.hint}>{src}</p>
                </div>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`${classes.image} ${className ?? ''}`}
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
};

export default ProductImage;
