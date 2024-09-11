import _ from 'lodash'
import { Types } from 'mongoose'

const getInfoData = ({ fields = [], object = {} }: { fields: string[], object: Record<string, any> }) => {
    return _.pick(object, fields)
}

const convertObjectId = (id: string) => {
    new Types.ObjectId(id);
}

export { getInfoData, convertObjectId }