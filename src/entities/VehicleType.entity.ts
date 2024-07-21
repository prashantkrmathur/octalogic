import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Vehicle } from "./Vehicle.entity";

export enum WHEEL {
    TWOWHEELER = "TWOWHEELER",
    FOURWHEELER = "FOURWHEELER"
}

export enum CarType {
    SEDAN = "SEDAN",
    SUV = "SUV",
    VAN = "VAN",
    HATCHbACK = 'HATCHBACK',
}

export enum BikeType {
    SPORTSBIKE = "SPORTSBIKE",
    COMMUTERBIKE = "COMMUTERBIKE",
    CRUISER = "CRUISER"

}
@Entity({ name: 'vehicleTypes' })
export class VehicleType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
            type: "enum",
            enum: WHEEL,
            default: WHEEL.FOURWHEELER
        })
    type: WHEEL

    @Column({
        type : "enum",
        enum: CarType,
        default : null
    })
    carType: CarType | null

    @Column({
        type : "enum",
        enum: BikeType,
        default : null
    })
    bikeType: BikeType | null

    @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleType)
    vehicle: Vehicle[]

    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
}