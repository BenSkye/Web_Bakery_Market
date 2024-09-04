import _ from 'lodash'

const getInfoData = ({ fields = [], object = {} }: { fields: string[], object: Record<string, any> }) => {
    return _.pick(object, fields)
}

export { getInfoData }