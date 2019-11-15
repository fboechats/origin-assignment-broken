import { convert, filter } from "./vinService"
import { vinCheckResponseFixture, vinResultFixture, carInfoFixture } from "../test/fixtures"

describe("Vin Service", () => {
    describe("Response converter", () => {
        it("gives empty result when no data is given", () => expect(convert(null)).toEqual(null))
        it("gives empty result when invalid data is given", () => expect(convert({} as any)).toEqual(null))
        it("gives empty result when response contains no data", () =>
            expect(convert(vinCheckResponseFixture({ Results: [] }))).toEqual(null))

        describe("Vin Service", () => {
            describe("Response converter", () => {
                it("gives empty result when no data is given", () => expect(convert(null)).toEqual(null))
                it("gives empty result when invalid data is given", () => expect(convert({} as any)).toEqual(null))
                it("gives empty result when response contains no data", () =>
                    expect(convert(vinCheckResponseFixture({ Results: [] }))).toEqual(null))

                it("takes make from Results array", () =>
                    expect(
                        convert(vinCheckResponseFixture({ Results: [vinResultFixture({ Make: "HONDA" })] })).make
                    ).toEqual("HONDA"))

                it("takes year from Results array", () =>
                    expect(
                        convert(vinCheckResponseFixture({ Results: [vinResultFixture({ ModelYear: "2007" })] })).year
                    ).toEqual(2007))

                it("takes type from Results array", () =>
                    expect(
                        convert(
                            vinCheckResponseFixture({ Results: [vinResultFixture({ VehicleType: "PASSANGER CAR" })] })
                        ).vehicleType
                    ).toEqual("PASSANGER CAR"))

                it("takes trim from Results array", () =>
                    expect(
                        convert(vinCheckResponseFixture({ Results: [vinResultFixture({ Trim: "" })] })).trim
                    ).toEqual(""))

                it("takes all values from Results", () =>
                    expect(
                        convert(
                            vinCheckResponseFixture({
                                Results: [
                                    vinResultFixture({
                                        Make: "HONDA",
                                        ModelYear: "2007",
                                        Model: "rx8",
                                        VehicleType: "PASSANGER CAR",
                                        Trim: "RX8"
                                    })
                                ]
                            })
                        )
                    ).toEqual(
                        carInfoFixture({
                            make: "HONDA",
                            year: 2007,
                            model: "rx8",
                            vehicleType: "PASSANGER CAR",
                            trim: "RX8"
                        })
                    ))
            })

            describe("Vin string filter", () => {
                it("uppercases given string", () => expect(filter("abc")).toEqual("ABC"))
                it("disallows IOQ", () => expect(filter("IOQabc")).toEqual("ABC"))
                it("disallows ioq", () => expect(filter("ioqabc")).toEqual("ABC"))
                it("trims to first 17 chars", () => expect(filter("SHH3607U002758123abc")).toEqual("SHH3607U002758123"))
            })
        })
    })
})
