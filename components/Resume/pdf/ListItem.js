import { Text, View } from '@react-pdf/renderer';

const ListItem = ({ children, styles }) => {
    return (
        <View style={styles?.listItem}>
            <Text style={styles?.listBullet}>•</Text>
            <Text style={styles?.listContent}>{children}</Text>
        </View>
    );
};

export default ListItem;
