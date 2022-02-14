import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import { Condition } from "./condition.entity";
import { Gender } from "./gender.entity";
import { ProductPhoto } from "./product-photo.entity";
import { Size } from "./size.entity";
import { Subcategory } from "./subcategory.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @Column({ type: "varchar", nullable: false })
    brand: string;

    @Column({ type: "varchar", nullable: false })
    model: string;

    @Column({ type: "varchar", nullable: true })
    description: string;

    @Column({ type: "varchar", nullable: false })
    country: string;

    @Column({ type: "varchar", nullable: false })
    region: string;

    @Column({ type: "int", nullable: false })
    cost: number;

    @Column({ type: "boolean", nullable: false })
    isExchange: boolean;

    @Column({ type: "boolean", nullable: false })
    isMail: boolean;

    @OneToMany(() => ProductPhoto, photo => photo.product, { eager: true, onDelete: "CASCADE" })
    photos: ProductPhoto[];

    @ManyToOne(() => Size, size => size.products)
    size: Size;

    @ManyToOne(() => Condition, condition => condition.products)
    condition: Condition;

    @ManyToOne(() => Gender, gender => gender.products)
    gender: Gender;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @ManyToOne(() => Subcategory, subcategory => subcategory.products)
    subcategory: Subcategory;
}