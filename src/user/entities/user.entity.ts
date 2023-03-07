import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';

@Entity('users')
@Unique('my_unique_constraint', ['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 250 })
  name: string;

  @Column({ nullable: false, unique: true, length: 250 })
  username: string;

  @Column({ nullable: false, length: 250 })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await new Promise((resolve, reject) =>
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) reject(err);
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      }),
    );
  }

  async hashMatches(pass: string) {
    return new Promise((resolve, reject) =>
      bcrypt.compare(pass, this.password, function (err, result) {
        if (err) reject(err);
        resolve(result);
      }),
    );
  }
}
