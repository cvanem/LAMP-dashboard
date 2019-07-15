import { Timestamp } from './Type'

/**
 * An event generated by a participant interacting with the LAMP app.
 */
export class SensorEvent { 

    /**
     *
     */
    timestamp?: Timestamp
    
    /**
     * The type of the sensor event.
     */
    sensor?: string
    
    /**
     * The item information recorded within the sensor event.
     */
    data?: any
}
