import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VehicleType } from "./VehicleType.entity";
import { Booking } from "./Booking.entity";



@Entity({ name: "vehicles" })
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    imageUrl: string

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    pricePerDay: number;

    @ManyToOne(() => VehicleType, (vehicleType => vehicleType.vehicle))
    vehicleType: VehicleType

    @OneToMany(() => Booking, booking => booking.vehicle)
    bookings: Booking[];
}