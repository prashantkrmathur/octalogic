import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./User.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity({name:"booking"})
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => UserEntity, user => user.bookings)
  user: UserEntity;

  @ManyToOne(() =>Vehicle, vehicle => vehicle.bookings)
  vehicle: Vehicle;
}
