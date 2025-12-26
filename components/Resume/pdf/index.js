'use client';

import { Page, Text, View, Document, Link } from '@react-pdf/renderer';
import Section from './Section';
import ListItem from './ListItem';
import { createStyles } from '../Styles';
import formatDate from '@/utils/formatDate';

const Header = ({ data, styles }) => {
    // Create contact info array - ATS systems prefer plain text contact info
    const contactItems = [
        data['phone'],
        data['email'],
        data['linkedin'] ? `LinkedIn: ${data['linkedin'].replace('https://', '').replace('http://', '')}` : null,
        data['github'] ? `GitHub: ${data['github'].replace('https://', '').replace('http://', '')}` : null,
        data['portfolio'] ? `Portfolio: ${data['portfolio'].replace('https://', '').replace('http://', '')}` : null,
    ].filter(Boolean);

    return (
        <View style={styles.header}>
            <Text style={styles.header__name}>{data.name}</Text>
            {data.title && <Text style={styles.header__title}>{data.title}</Text>}
            {data.address && <Text style={styles.smallText}>{data.address}</Text>}
            <View style={styles.header__links}>
                {contactItems.map((item, index) => (
                    <Text key={index} style={styles.header__link}>
                        {item}
                        {index < contactItems.length - 1 && <Text style={styles.header__separator}> | </Text>}
                    </Text>
                ))}
            </View>
        </View>
    );
};

const Education = ({ data, styles }) => (
    <Section title="EDUCATION" styles={styles}>
        {data.map(({ degree, institution, start, end, location, gpa }, i) => (
            <View key={i} style={styles.wrapper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{degree}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)} - {formatDate(end)}
                    </Text>
                </View>
                <View style={styles.subTitle_wrapper}>
                    <Text style={styles.subTitle}>
                        {institution}
                        {gpa && <Text> | GPA: {gpa}</Text>}
                    </Text>
                    {location && <Text style={styles.location}>{location}</Text>}
                </View>
                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Projects = ({ data, styles }) => (
    <Section title="PROJECTS" styles={styles}>
        {data.map((project, i) => (
            <View key={i} style={styles.wrapper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>
                        {project.title}
                        {project.url && (
                            <Text style={styles.smallText}> | {project.url.replace('https://', '').replace('http://', '')}</Text>
                        )}
                    </Text>
                </View>
                <View style={styles.lists}>
                    {project.description
                        ?.split('\n')
                        .filter(line => line.trim())
                        .map((point, j) => (
                            <ListItem key={j} styles={styles}>{point.trim()}</ListItem>
                        ))}
                </View>
                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Experience = ({ data, styles }) => (
    <Section title="PROFESSIONAL EXPERIENCE" styles={styles}>
        {data.map(({ role, start, end, company, location, description }, i) => (
            <View key={i} style={styles.wrapper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{role}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)} - {end ? formatDate(end) : 'Present'}
                    </Text>
                </View>
                <View style={styles.subTitle_wrapper}>
                    <Text style={styles.subTitle}>{company}</Text>
                    {location && <Text style={styles.location}>{location}</Text>}
                </View>
                <View style={styles.lists}>
                    {description
                        ?.split('\n')
                        .filter(line => line.trim())
                        .map((point, j) => (
                            <ListItem key={j} styles={styles}>{point.trim()}</ListItem>
                        ))}
                </View>
                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Skills = ({ data, styles }) => {
    // Parse skills - support both "Category: skill1, skill2" and simple list format
    const skillLines = data?.split('\n').filter(line => line.trim()) || [];

    return (
        <Section title="SKILLS" styles={styles}>
            <View style={styles.skills__container}>
                {skillLines.map((line, i) => {
                    // Check if line has category format "Category: skills"
                    const colonIndex = line.indexOf(':');
                    if (colonIndex > 0 && colonIndex < 30) {
                        const category = line.substring(0, colonIndex).trim();
                        const skills = line.substring(colonIndex + 1).trim();
                        return (
                            <View key={i} style={styles.skills__row}>
                                <Text style={styles.skills__label}>{category}:</Text>
                                <Text style={styles.skills__value}>{skills}</Text>
                            </View>
                        );
                    }
                    // Simple text format
                    return (
                        <Text key={i} style={styles.text}>{line}</Text>
                    );
                })}
            </View>
        </Section>
    );
};

const Certificates = ({ data, styles }) => (
    <Section title="CERTIFICATIONS" styles={styles}>
        {data.map(({ title, issuer, date }, i) => (
            <View key={i} style={styles.wrapper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{title}</Text>
                    {date && <Text style={styles.date}>{formatDate(date)}</Text>}
                </View>
                {issuer && (
                    <View style={styles.subTitle_wrapper}>
                        <Text style={styles.subTitle}>{issuer}</Text>
                    </View>
                )}
                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Languages = ({ data, styles }) => (
    <Section title="LANGUAGES" styles={styles}>
        <View style={styles.inline_wrapper}>
            {data.map(({ language, proficiency }, i) => (
                <Text key={i} style={styles.text}>
                    {language}: {proficiency}
                    {i < data.length - 1 && ' | '}
                </Text>
            ))}
        </View>
    </Section>
);

const Summary = ({ data, styles }) => (
    <Section title="PROFESSIONAL SUMMARY" styles={styles}>
        <Text style={styles.summary}>{data}</Text>
    </Section>
);

const Resume = ({ data, customization = {} }) => {
    const { contact, education, experience, projects, summary, skills, certificates, languages } = data;
    
    // Create styles based on customization
    const styles = createStyles(customization);
    
    // Default section order for ATS (most important sections first)
    const sectionOrder = customization.sectionOrder || [
        'summary',
        'experience', 
        'education',
        'skills',
        'projects',
        'certificates',
        'languages'
    ];

    // Render sections based on order
    const renderSection = (sectionName) => {
        switch (sectionName) {
            case 'summary':
                return summary?.summary && <Summary key="summary" data={summary.summary} styles={styles} />;
            case 'experience':
                return experience?.length > 0 && <Experience key="experience" data={experience} styles={styles} />;
            case 'education':
                return education?.length > 0 && <Education key="education" data={education} styles={styles} />;
            case 'skills':
                return skills?.skills?.length > 0 && <Skills key="skills" data={skills.skills} styles={styles} />;
            case 'projects':
                return projects?.length > 0 && <Projects key="projects" data={projects} styles={styles} />;
            case 'certificates':
                return certificates?.length > 0 && <Certificates key="certificates" data={certificates} styles={styles} />;
            case 'languages':
                return languages?.length > 0 && <Languages key="languages" data={languages} styles={styles} />;
            default:
                return null;
        }
    };

    return (
        <Document
            title={`${contact?.name || 'Resume'} - Resume`}
            author={contact?.name || 'Resumave User'}
            subject="Professional Resume"
            keywords="resume, cv, professional"
            language="en"
        >
            <Page size="A4" style={styles.page}>
                <Header data={contact} styles={styles} />
                {sectionOrder.map(section => renderSection(section))}
            </Page>
        </Document>
    );
};

export default Resume;

