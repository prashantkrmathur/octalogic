import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity({name:"booking"})
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => UserEntity, user => user.bookings)
  @JoinColumn({name: 'userId'})
  user: UserEntity;

  @Column()
  userId: string;

  @ManyToOne(() =>Vehicle, vehicle => vehicle.bookings)
  @JoinColumn({name: 'vehicleId'})
  vehicle: Vehicle;

  @Column()
  vehicleId : string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;  

}
