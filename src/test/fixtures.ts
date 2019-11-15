export const fixtureFactory = <T>(defaults: T) => (params: Partial<T> = {}) =>
    (({ ...(defaults as any), ...(params as any) } as any) as T)

export const vinResultFixture = fixtureFactory<VinResultEntry>({
    Make: "HONDA",
    Model: "",
    ModelYear: "2007",
    Trim: "",
    VehicleType: "PASSENGER CAR"
})

export const vinCheckResponseFixture = fixtureFactory<VinCheckResponse>({
    Results: []
})

export const carInfoFixture = fixtureFactory<CarInfo>({
    make: "HONDA",
    model: "",
    year: 2007,
    trim: "",
    vehicleType: "PASSENGER CAR"
})
