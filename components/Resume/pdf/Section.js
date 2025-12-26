import { Text, View } from '@react-pdf/renderer';

const Section = ({ title, styles, children }) => {
    return (
        <View style={styles?.section}>
            {title && (
                <Text style={styles?.section__title}>{title}</Text>
            )}
            {children}
        </View>
    );
};

export default Section;
