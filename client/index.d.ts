declare module "*.jpg" {
    const value: string;
    export = value;
}

declare module "*.png" {
    const value: string;
    export = value;
}

declare module "*.svg" {
    const value: string;
    export = value;
}

declare module "*.svg?sprite" {
    const value: React.FC<{
        className?: string;
        width?: string;
        height?: string;
        onClick?: (Event) => void;
        onAnimationEnd?: (Event) => void;
    }>;
    export = value;
}

declare module "*.gif" {
    const value: string;
    export = value;
}

declare module "*.webp" {
    const value: string;
    export = value;
}

declare module "*.woff2" {
    const value: string;
    export = value;
}