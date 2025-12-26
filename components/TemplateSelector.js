'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setTemplate, updateCustomization, resetToDefault, templates } from '@/store/slices/templateSlice';
import { saveResume } from '@/store/slices/resumeSlice';
import { useState } from 'react';
import { FaPalette, FaCheck, FaRotateLeft } from 'react-icons/fa6';

const TemplateSelector = () => {
    const dispatch = useDispatch();
    const { selectedTemplate, customization } = useSelector(state => state.template);
    const [isOpen, setIsOpen] = useState(false);

    const handleTemplateChange = (templateName) => {
        dispatch(setTemplate(templateName));
        dispatch(saveResume()); // Trigger PDF regeneration
    };

    const handleColorChange = (key, value) => {
        dispatch(updateCustomization({ key, value }));
        dispatch(saveResume());
    };

    const handleReset = () => {
        dispatch(resetToDefault());
        dispatch(saveResume());
    };

    const fontOptions = [
        { value: 'Times-Roman', label: 'Times New Roman' },
        { value: 'Helvetica', label: 'Helvetica' },
        { value: 'Courier', label: 'Courier' },
    ];

    const fontSizeOptions = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
    ];

    const lineSpacingOptions = [
        { value: 'compact', label: 'Compact' },
        { value: 'normal', label: 'Normal' },
        { value: 'relaxed', label: 'Relaxed' },
    ];

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600"
            >
                <FaPalette />
                <span>Customize Template</span>
            </button>

            {isOpen && (
                <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    {/* Template Selection */}
                    <div className="mb-6">
                        <h3 className="mb-3 text-lg font-semibold text-gray-800">Choose Template</h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                            {Object.entries(templates).map(([key, template]) => (
                                <button
                                    key={key}
                                    onClick={() => handleTemplateChange(key)}
                                    className={`relative rounded-lg border-2 p-3 text-left transition-all ${
                                        selectedTemplate === key
                                            ? 'border-primary-500 bg-primary-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {selectedTemplate === key && (
                                        <FaCheck className="absolute right-2 top-2 text-primary-500" />
                                    )}
                                    <div
                                        className="mb-2 h-3 w-full rounded"
                                        style={{ backgroundColor: template.primaryColor }}
                                    />
                                    <p className="text-sm font-medium text-gray-800">{template.name}</p>
                                    <p className="text-xs text-gray-500">{template.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Customization */}
                    <div className="mb-6">
                        <h3 className="mb-3 text-lg font-semibold text-gray-800">Colors</h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Primary Color</label>
                                <input
                                    type="color"
                                    value={customization.primaryColor}
                                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                                    className="h-10 w-full cursor-pointer rounded border border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Header Color</label>
                                <input
                                    type="color"
                                    value={customization.headerColor}
                                    onChange={(e) => handleColorChange('headerColor', e.target.value)}
                                    className="h-10 w-full cursor-pointer rounded border border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Text Color</label>
                                <input
                                    type="color"
                                    value={customization.textColor}
                                    onChange={(e) => handleColorChange('textColor', e.target.value)}
                                    className="h-10 w-full cursor-pointer rounded border border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Accent Color</label>
                                <input
                                    type="color"
                                    value={customization.accentColor}
                                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                                    className="h-10 w-full cursor-pointer rounded border border-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Typography Settings */}
                    <div className="mb-6">
                        <h3 className="mb-3 text-lg font-semibold text-gray-800">Typography</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Font Family</label>
                                <select
                                    value={customization.fontFamily}
                                    onChange={(e) => handleColorChange('fontFamily', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none"
                                >
                                    {fontOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Font Size</label>
                                <select
                                    value={customization.fontSize}
                                    onChange={(e) => handleColorChange('fontSize', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none"
                                >
                                    {fontSizeOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Line Spacing</label>
                                <select
                                    value={customization.lineSpacing}
                                    onChange={(e) => handleColorChange('lineSpacing', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none"
                                >
                                    {lineSpacingOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ATS Tips */}
                    <div className="mb-4 rounded-lg bg-blue-50 p-4">
                        <h4 className="mb-2 font-semibold text-blue-800">💡 ATS-Friendly Tips</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-blue-700">
                            <li>Use standard fonts like Times New Roman or Helvetica</li>
                            <li>Keep formatting simple - no tables, columns, or graphics</li>
                            <li>Use standard section headings (Experience, Education, Skills)</li>
                            <li>Include keywords from the job description</li>
                            <li>Use bullet points for easy parsing</li>
                        </ul>
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
                    >
                        <FaRotateLeft />
                        <span>Reset to Default</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default TemplateSelector;
