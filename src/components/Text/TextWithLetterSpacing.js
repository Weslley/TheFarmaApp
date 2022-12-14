import React from 'react'
import { View } from 'react-native'
import { Letter } from './Letter'

const spacingForLetterIndex = (letters, index, spacing) => (letters.length - 1 === index) ? 0 : spacing

const TextWithLetterSpacing = (props) => {
    const { children, spacing, viewStyle, textStyle } = props
    const letters = children.split('')

    return (
        <View style={[{ flexDirection: 'row' }, viewStyle]}>
            {letters.map((letter, index) =>
                <Letter key={index} spacing={spacingForLetterIndex(letters, index, spacing)} textStyle={textStyle}>
                    {letter}
                </Letter>
            )}
        </View>
    )
}

export default TextWithLetterSpacing;