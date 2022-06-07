interface Parameter {
    average: number;
    count: number;
    displayName: string;
    firstUpdated: string;
    id: number;
    lastUpdated: string;
    lastValue: number;
    parameter: string;
    parameterId: number;
    unit: string;
}

export interface Location {
    city: string;
    country: string;
    firstUpdated: string;
    id: number;
    lastUpdated: string;
    measurements: number;
    name: string;
    parameters: Parameter[];
}