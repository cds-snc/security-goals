const { GraphQLObjectType } = require('graphql')
const { OpenControl } = require('./OpenControl.js')

// TODO: this isn't correct. This type is just representing the selection of
// controls in the "light" certification.
const ITSG33a = new GraphQLObjectType({
  name: 'ITSG33a',
  description: 'IT Security Risk Management Security Controls',
  fields: () => ({
    AC_2: {
      description: 'Account Management',
      type: OpenControl,
    },
    AC_3: {
      description: 'Access Enforcement',
      type: OpenControl,
    },
    AC_6: {
      description: 'Least Priviledge',
      type: OpenControl,
    },
    AU_2: {
      description: 'Auditable Events',
      type: OpenControl,
    },
    AU_3: {
      description: 'Content of Audit Records',
      type: OpenControl,
    },
    AU_3_1: {
      description: '(1) Content of Audit Records',
      type: OpenControl,
    },
    AU_6: {
      description: 'Audit Review, Analysis, And Reporting',
      type: OpenControl,
    },
    AU_8: {
      description: 'Time Stamps',
      type: OpenControl,
    },
    AU_8_1: {
      description: 'Time Stamps (1)',
      type: OpenControl,
    },
    CA_2_2: {
      description: 'Security Assessments | Specialized Assessments (2)',
      type: OpenControl,
    },
    CA_8: {
      description: 'Penetration Testing',
      type: OpenControl,
    },
    CA_8_1: {
      description: 'Penetration Testing (1)',
      type: OpenControl,
    },
    CM_2: {
      description: 'Baseline Configuration',
      type: OpenControl,
    },
    CM_6_1: {
      description: 'Configuration Settings',
      type: OpenControl,
    },
    CM_7: {
      description: 'Least Functionality',
      type: OpenControl,
    },
    CM_8: {
      description: 'Information System Component Inventory',
      type: OpenControl,
    },
    CM_8_1: {
      description:
        'Information System Component Inventory - Updates During Installs and Removals',
      type: OpenControl,
    },
    CM_8_4: {
      description:
        'Information System Component Inventory - Accountable Information',
      type: OpenControl,
    },
    IA_5_7: {
      description:
        'Authenticator Management - No embedded unencrypted static keys',
      type: OpenControl,
    },
    PL_8: {
      description: 'Information Security Architecture',
      type: OpenControl,
    },
    RA_5: {
      description: 'Vulnerability Scanning',
      type: OpenControl,
    },
    SA_11: {
      description: 'Developer Security Testing',
      type: OpenControl,
    },
    SA_11_1: {
      description: 'Static Code Analysis',
      type: OpenControl,
    },
    SA_11_4: {
      description: 'Manual Code Reviews',
      type: OpenControl,
    },
    SA_12: {
      description: 'Supply Chain Protection',
      type: OpenControl,
    },
    SA15_4: {
      description: 'Threat Modeling / Vulnerability Analysis',
      type: OpenControl,
    },
    SA_22: {
      description: 'Unsupported System Components',
      type: OpenControl,
    },
    SC_7: {
      description: 'Boundary Protection',
      type: OpenControl,
    },
    SC_8: {
      description: 'Transmission confidentiality and Integrity',
      type: OpenControl,
    },
    SC_12: {
      description: 'Cryptographic Key Management and Establishment',
      type: OpenControl,
    },
    SC_13: {
      description: 'Cryptographic Protection',
      type: OpenControl,
    },
    SI_2: {
      description: 'Flaw remediation',
      type: OpenControl,
    },
    SI_5: {
      description: 'Security Alerts, Advisories, and Directives',
      type: OpenControl,
    },
    SI_10: {
      description: 'Information Input Validation',
      type: OpenControl,
    },
    SI_11: {
      description: 'Error Handling',
      type: OpenControl,
    },
    SI_17: {
      description: 'Fail-Safe Procedures',
      type: OpenControl,
    },
  }),
})

module.exports.ITSG33a = ITSG33a
