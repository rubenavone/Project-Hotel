import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Generation de l'entité Category
 * @param  {number} id //Auto incrémenté dans la bdd
 * @param  {string} name
 * @param  {string} description
 * @param  {number} persons
 */
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 150 })
  description: string;

  @Column()
  persons: number;

  toString() {
    console.log(
      `[ id : ${this.id} name: ${this.name} description : ${this.description} persons: ${this.persons} ]`,
    );
  }
}
