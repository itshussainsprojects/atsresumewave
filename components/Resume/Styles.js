import { StyleSheet } from '@react-pdf/renderer';

// Font sizes based on settings
const fontSizes = {
    small: { name: 18, section: 11, title: 10, text: 9, small: 8 },
    medium: { name: 20, section: 12, title: 11, text: 10, small: 9 },
    large: { name: 22, section: 13, title: 12, text: 11, small: 10 },
};

// Line spacing based on settings
const lineSpacings = {
    compact: { section: 6, item: 3, list: 1 },
    normal: { section: 8, item: 4, list: 2 },
    relaxed: { section: 10, item: 6, list: 3 },
};

// Create dynamic styles based on customization
export const createStyles = (customization = {}) => {
    const {
        primaryColor = '#2563eb',
        headerColor = '#1f2937',
        textColor = '#374151',
        accentColor = '#4b5563',
        fontSize = 'medium',
        fontFamily = 'Times-Roman',
        lineSpacing = 'normal',
    } = customization;

    const sizes = fontSizes[fontSize] || fontSizes.medium;
    const spacing = lineSpacings[lineSpacing] || lineSpacings.normal;

    return StyleSheet.create({
        page: {
            backgroundColor: '#ffffff',
            color: textColor,
            padding: 30,
            paddingTop: 25,
            paddingBottom: 25,
            fontFamily: fontFamily,
        },

        // Header Section - ATS Optimized
        header: {
            textAlign: 'center',
            marginBottom: spacing.section,
            borderBottom: `1.5pt solid ${primaryColor}`,
            paddingBottom: spacing.item,
        },

        header__name: {
            color: headerColor,
            fontSize: sizes.name,
            fontFamily: `${fontFamily === 'Times-Roman' ? 'Times-Bold' : fontFamily === 'Helvetica' ? 'Helvetica-Bold' : 'Courier-Bold'}`,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 4,
        },

        header__title: {
            color: accentColor,
            fontSize: sizes.title,
            textAlign: 'center',
            marginBottom: 6,
        },

        header__links: {
            color: textColor,
            fontSize: sizes.small,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 4,
        },

        header__link: {
            color: textColor,
            textDecoration: 'none',
        },

        header__separator: {
            color: accentColor,
            marginHorizontal: 4,
        },

        // Section Styles - ATS Friendly
        section: {
            marginBottom: spacing.section,
        },

        section__title: {
            fontSize: sizes.section,
            fontFamily: `${fontFamily === 'Times-Roman' ? 'Times-Bold' : fontFamily === 'Helvetica' ? 'Helvetica-Bold' : 'Courier-Bold'}`,
            color: primaryColor,
            textTransform: 'uppercase',
            borderBottom: `1pt solid ${primaryColor}`,
            paddingBottom: 2,
            marginBottom: spacing.item,
            letterSpacing: 0.5,
        },

        // Content wrapper
        wrapper: {
            marginBottom: spacing.item,
        },

        // Title wrapper - for job titles, degrees, etc.
        title_wrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 1,
        },

        title: {
            fontFamily: `${fontFamily === 'Times-Roman' ? 'Times-Bold' : fontFamily === 'Helvetica' ? 'Helvetica-Bold' : 'Courier-Bold'}`,
            fontSize: sizes.title,
            color: headerColor,
            flex: 1,
        },

        date: {
            fontFamily: `${fontFamily === 'Times-Roman' ? 'Times-Italic' : fontFamily}`,
            fontSize: sizes.small,
            color: accentColor,
            textAlign: 'right',
        },

        // Subtitle wrapper - for company, institution, etc.
        subTitle_wrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
        },

        subTitle: {
            fontSize: sizes.text,
            color: accentColor,
        },

        location: {
            fontSize: sizes.small,
            color: accentColor,
            fontFamily: `${fontFamily === 'Times-Roman' ? 'Times-Italic' : fontFamily}`,
        },

        // List styles for bullet points
        lists: {
            marginTop: spacing.list,
            marginLeft: 0,
        },

        listItem: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: spacing.list,
            paddingLeft: 8,
        },

        listBullet: {
            width: 12,
            fontSize: sizes.text,
            color: textColor,
        },

        listContent: {
            flex: 1,
            fontSize: sizes.text,
            color: textColor,
            lineHeight: 1.4,
        },

        // Text styles
        text: {
            fontSize: sizes.text,
            color: textColor,
            lineHeight: 1.4,
        },

        smallText: {
            fontSize: sizes.small,
            color: accentColor,
        },

        // Skills section - ATS optimized (no tables, simple text)
        skills__container: {
            marginTop: 2,
        },

        skills__row: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 3,
            flexWrap: 'wrap',
        },

        skills__label: {
            fontFamily: `${fontFamily === 'Times-Roman' ? 'Times-Bold' : fontFamily === 'Helvetica' ? 'Helvetica-Bold' : 'Courier-Bold'}`,
            fontSize: sizes.text,
            color: headerColor,
            width: 120,
        },

        skills__value: {
            fontSize: sizes.text,
            color: textColor,
            flex: 1,
        },

        // Divider
        line: {
            borderBottom: `0.5pt solid #e5e7eb`,
            marginVertical: spacing.list,
        },

        // Link styles
        link: {
            color: textColor,
            textDecoration: 'none',
        },

        // Summary/Objective section
        summary: {
            fontSize: sizes.text,
            color: textColor,
            lineHeight: 1.5,
            textAlign: 'justify',
        },

        // Languages and Certifications
        inline_wrapper: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
        },

        inline_item: {
            marginRight: 16,
        },

        // Legacy support (keeping old property names for backward compatibility)
        wrappper: {
            marginBottom: spacing.item,
        },
    });
};

// Default styles (for backward compatibility)
const styles = createStyles();

export default styles;

