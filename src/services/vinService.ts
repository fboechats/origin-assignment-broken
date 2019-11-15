import { get } from "../utils/https"

const invalidChars = new RegExp(/IOQ/)

export const filter = (vin: string) =>
    vin
        .trim()
        .toUpperCase()
        .substring(0, 17)
        .replace(invalidChars, "")

export const validate = (_vin: string): string => {
    if (!_vin || _vin.length !== 17) {
        return "17 chars expected"
    }
    return null
}

export const convert = (_res: VinCheckResponse): CarInfo => {
    if (!(typeof _res === "object")) return null

    if (!_res) return null

    const results = _res.Results

    if (!results || !results[0]) return null

    const { Make, Trim, Model, ModelYear, VehicleType } = results[0]

    return {
        year: ModelYear ? parseInt(ModelYear) : undefined,
        make: Make,
        trim: Trim,
        model: Model,
        vehicleType: VehicleType
    }
}

export const apiCheck = async (_vin: string): Promise<CarInfo> => {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${_vin}?format=json`
    return get(url).then((results: VinCheckResponse) => convert(results))
}
