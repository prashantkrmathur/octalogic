import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VehicleType } from "./VehicleType.entity";
import { Booking } from "./Booking.entity";



@Entity({ name: "vehicles" })
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    make: string;

    @Column()
    category : string;

    @Column()
    imageUrl: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    pricePerDay: number;

    @Column()
    isBooked : boolean;

    @ManyToOne(() => VehicleType, (vehicleType => vehicleType.vehicle))
    @JoinColumn({ name: 'vehicleTypeId' })
    vehicleType: VehicleType

    @Column()
    vehicleTypeId: string

    @OneToMany(() => Booking, booking => booking.vehicle)
    bookings: Booking[];
}