import { createSlice } from '@reduxjs/toolkit';

// ATS-friendly templates configuration
export const templates = {
    classic: {
        name: 'Classic',
        description: 'Traditional ATS-friendly format',
        primaryColor: '#2563eb',
        headerColor: '#1f2937',
        textColor: '#374151',
        accentColor: '#4b5563',
    },
    modern: {
        name: 'Modern',
        description: 'Clean modern design',
        primaryColor: '#059669',
        headerColor: '#111827',
        textColor: '#374151',
        accentColor: '#6b7280',
    },
    professional: {
        name: 'Professional',
        description: 'Corporate professional style',
        primaryColor: '#7c3aed',
        headerColor: '#1e1b4b',
        textColor: '#4b5563',
        accentColor: '#6366f1',
    },
    minimal: {
        name: 'Minimal',
        description: 'Simple and clean',
        primaryColor: '#000000',
        headerColor: '#111111',
        textColor: '#333333',
        accentColor: '#666666',
    },
    executive: {
        name: 'Executive',
        description: 'Senior/executive style',
        primaryColor: '#0369a1',
        headerColor: '#0c4a6e',
        textColor: '#334155',
        accentColor: '#475569',
    },
};

const defaultTemplate = {
    selectedTemplate: 'classic',
    customization: {
        primaryColor: templates.classic.primaryColor,
        headerColor: templates.classic.headerColor,
        textColor: templates.classic.textColor,
        accentColor: templates.classic.accentColor,
        fontSize: 'medium', // small, medium, large
        fontFamily: 'Times-Roman', // Times-Roman, Helvetica, Courier
        lineSpacing: 'normal', // compact, normal, relaxed
        showIcons: false, // ATS systems prefer no icons
        sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certificates', 'languages'],
    },
};

const templateSlice = createSlice({
    name: 'template',
    initialState: defaultTemplate,
    reducers: {
        setTemplate: (state, action) => {
            const templateName = action.payload;
            if (templates[templateName]) {
                state.selectedTemplate = templateName;
                state.customization.primaryColor = templates[templateName].primaryColor;
                state.customization.headerColor = templates[templateName].headerColor;
                state.customization.textColor = templates[templateName].textColor;
                state.customization.accentColor = templates[templateName].accentColor;
            }
        },
        updateCustomization: (state, action) => {
            const { key, value } = action.payload;
            if (key in state.customization) {
                state.customization[key] = value;
            }
        },
        updateSectionOrder: (state, action) => {
            state.customization.sectionOrder = action.payload;
        },
        resetToDefault: (state) => {
            const template = templates[state.selectedTemplate];
            state.customization = {
                ...defaultTemplate.customization,
                primaryColor: template.primaryColor,
                headerColor: template.headerColor,
                textColor: template.textColor,
                accentColor: template.accentColor,
            };
        },
    },
});

export const { setTemplate, updateCustomization, updateSectionOrder, resetToDefault } = templateSlice.actions;
export default templateSlice.reducer;
