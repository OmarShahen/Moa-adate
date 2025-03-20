import { View } from "react-native"

const Spacing = ({ size=16, type }) => {

    const getSpacingByType = (type) => {
        if(type == 'small') {
            return 8
        } else if(type == 'large') {
            return 32
        } else if(type == 'medium') {
            return 16
        }

        return 16
    }


    return <View style={type ? { height : getSpacingByType(type) } : { height: size }}></View>
}

export default Spacing