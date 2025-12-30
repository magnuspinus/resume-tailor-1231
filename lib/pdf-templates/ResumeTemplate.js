import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts if needed (optional, uses default fonts if not registered)
// Font.register({
//   family: 'Calibri',
//   src: 'path/to/font.ttf',
// });

// Helper function to extract year from date string
const extractYear = (dateStr) => {
  if (!dateStr) return '';
  const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? yearMatch[0] : dateStr;
};

// Helper component to render text with bold tags
const BoldText = ({ text, style }) => {
  if (!text) return null;
  
  // Check if text contains <strong> tags
  if (!text.includes('<strong>')) {
    return <Text style={style}>{text}</Text>;
  }

  const parts = [];
  const regex = /<strong>(.*?)<\/strong>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
      parts.push({ type: 'bold', text: match[1] });
    } else {
      parts.push({ type: 'bold', text: match[1] });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <Text style={style}>
      {parts.map((part, idx) => {
        if (typeof part === 'object' && part.type === 'bold') {
          return (
            <Text key={idx} style={styles.boldText}>
              {part.text}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};

// Styles
const styles = StyleSheet.create({
  page: {
    padding: '15mm',
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#1e293b',
  },
  header: {
    textAlign: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#2563eb',
  },
  title: {
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 6,
    color: '#475569',
  },
  contact: {
    fontSize: 9.5,
    color: '#64748b',
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#1e40af',
    backgroundColor: '#eff6ff',
    padding: '8px 15px',
    marginBottom: 10,
    letterSpacing: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
  },
  summary: {
    fontSize: 10.5,
    lineHeight: 1.7,
    textAlign: 'left',
    color: '#1e293b',
  },
  skillsCategory: {
    marginBottom: 4,
    lineHeight: 1.4,
    flexDirection: 'row',
  },
  skillsLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e40af',
    marginRight: 8,
  },
  skillsList: {
    fontSize: 10,
    color: '#475569',
  },
  expItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  expTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  expDates: {
    fontSize: 9.5,
    color: '#3b82f6',
    fontWeight: 600,
  },
  expCompany: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 3,
    fontStyle: 'italic',
  },
  expDetails: {
    marginLeft: 16,
  },
  expDetailItem: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 2,
    color: '#1e293b',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  eduDegree: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  eduDates: {
    fontSize: 9.5,
    color: '#3b82f6',
    fontWeight: 600,
  },
  eduSchool: {
    fontSize: 10,
    color: '#64748b',
    fontStyle: 'italic',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

const ResumeTemplate = ({ data }) => {
  const {
    name,
    title,
    email,
    phone,
    location,
    linkedin,
    website,
    summary,
    skills,
    experience,
    education,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.contact}>
            {email}
            {phone && ` • ${phone}`}
            {location && ` • ${location}`}
            {linkedin && ` • ${linkedin}`}
            {website && ` • ${website}`}
          </Text>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <BoldText text={summary} style={styles.summary} />
          </View>
        )}

        {/* Skills */}
        {skills && Object.keys(skills).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Areas of Expertise</Text>
            {Object.entries(skills).map(([category, skillList], idx) => (
              <View key={idx} style={styles.skillsCategory}>
                <Text style={styles.skillsLabel}>{category}:</Text>
                <Text style={styles.skillsList}>{Array.isArray(skillList) ? skillList.join(', ') : skillList}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, idx) => (
              <View key={idx} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expTitle}>{exp.title || 'Engineer'}</Text>
                  <Text style={styles.expDates}>
                    {exp.start_date} – {exp.end_date}
                  </Text>
                </View>
                <Text style={styles.expCompany}>
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </Text>
                {exp.details && exp.details.length > 0 && (
                  <View style={styles.expDetails}>
                    {exp.details.map((detail, detailIdx) => (
                      <View key={detailIdx} style={{ marginBottom: 2 }}>
                        <BoldText text={`• ${detail}`} style={styles.expDetailItem} />
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education & Credentials</Text>
            {education.map((edu, idx) => (
              <View key={idx} style={styles.eduItem}>
                <View style={styles.eduHeader}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduDates}>
                    {extractYear(edu.start_year)}
                    {edu.end_year && ` – ${extractYear(edu.end_year)}`}
                  </Text>
                </View>
                <Text style={styles.eduSchool}>
                  {edu.school}
                  {edu.grade && ` • GPA: ${edu.grade}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumeTemplate;

