import { FormField, FormFieldType, FeedDataCategory, FormSection } from '../interfaces/form-field.interface';

export const FEED_DETAILS_CONFIG: FormField[] = [
  // FEED PROFILE DATA (15 fields)
  {
    type: FormFieldType.TEXT,
    label: 'Feed Name',
    name: 'feedName',
    information: 'Unique identifier for the feed',
    placeholder: 'Enter feed name',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Feed Identification',
    teamResponsible: 'Data Engineering',
    validations: {
      required: true,
      pattern: '^[a-zA-Z0-9-_]+$',
      message: 'Only alphanumeric characters, hyphens and underscores allowed'
    },
    order: 1
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Feed Description',
    name: 'feedDescription',
    information: 'Detailed description of the feed purpose',
    placeholder: 'Enter feed description',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Feed Overview',
    teamResponsible: 'Business Team',
    validations: {
      required: true,
      message: 'Feed description is required'
    },
    order: 2
  },
  {
    type: FormFieldType.SELECT,
    label: 'Business Domain',
    name: 'businessDomain',
    information: 'Primary business domain for the feed',
    placeholder: 'Select business domain',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Business Classification',
    teamResponsible: 'Business Team',
    options: [
      { value: 'finance', label: 'Finance' },
      { value: 'sales', label: 'Sales' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'operations', label: 'Operations' },
      { value: 'hr', label: 'Human Resources' }
    ],
    validations: {
      required: true
    },
    order: 3
  },
  {
    type: FormFieldType.SELECT,
    label: 'Data Classification',
    name: 'dataClassification',
    information: 'Security classification of the data',
    placeholder: 'Select classification',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Security',
    teamResponsible: 'Security Team',
    options: [
      { value: 'public', label: 'Public' },
      { value: 'internal', label: 'Internal' },
      { value: 'confidential', label: 'Confidential' },
      { value: 'restricted', label: 'Restricted' }
    ],
    validations: {
      required: true
    },
    order: 4
  },
  {
    type: FormFieldType.TEXT,
    label: 'Business Owner',
    name: 'businessOwner',
    information: 'Primary business owner of the feed',
    placeholder: 'Enter business owner name',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Ownership',
    teamResponsible: 'Business Team',
    validations: {
      required: true,
      message: 'Business owner is required'
    },
    order: 5
  },
  {
    type: FormFieldType.TEXT,
    label: 'Technical Owner',
    name: 'technicalOwner',
    information: 'Primary technical owner of the feed',
    placeholder: 'Enter technical owner name',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Ownership',
    teamResponsible: 'Data Engineering',
    validations: {
      required: true,
      message: 'Technical owner is required'
    },
    order: 6
  },
  {
    type: FormFieldType.SELECT,
    label: 'Data Category',
    name: 'dataCategory',
    information: 'Category of data being processed',
    placeholder: 'Select data category',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Data Classification',
    teamResponsible: 'Data Governance',
    options: [
      { value: 'master', label: 'Master Data' },
      { value: 'reference', label: 'Reference Data' },
      { value: 'transaction', label: 'Transactional Data' },
      { value: 'metadata', label: 'Metadata' }
    ],
    validations: {
      required: true
    },
    order: 7
  },
  {
    type: FormFieldType.SELECT,
    label: 'Business Criticality',
    name: 'businessCriticality',
    information: 'Business importance of the feed',
    placeholder: 'Select criticality level',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Business Impact',
    teamResponsible: 'Business Team',
    options: [
      { value: 'critical', label: 'Critical' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ],
    validations: {
      required: true
    },
    order: 8
  },
  {
    type: FormFieldType.TEXT,
    label: 'Cost Center',
    name: 'costCenter',
    information: 'Cost center responsible for the feed',
    placeholder: 'Enter cost center code',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Financial',
    teamResponsible: 'Finance Team',
    validations: {
      required: true,
      pattern: '^[A-Z0-9]{6}$',
      message: 'Cost center must be 6 characters'
    },
    order: 9
  },
  {
    type: FormFieldType.SELECT,
    label: 'Geographic Region',
    name: 'geographicRegion',
    information: 'Primary geographic region for the feed',
    placeholder: 'Select region',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Geographic',
    teamResponsible: 'Business Team',
    options: [
      { value: 'na', label: 'North America' },
      { value: 'emea', label: 'Europe/Middle East' },
      { value: 'apac', label: 'Asia Pacific' },
      { value: 'latam', label: 'Latin America' }
    ],
    validations: {
      required: true
    },
    order: 10
  },
  {
    type: FormFieldType.TEXT,
    label: 'Project Reference',
    name: 'projectReference',
    information: 'Associated project identifier',
    placeholder: 'Enter project reference',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Project Management',
    teamResponsible: 'Project Management',
    validations: {
      required: true,
      pattern: '^PRJ-[0-9]{4}$',
      message: 'Project reference must be in format PRJ-XXXX'
    },
    order: 11
  },
  {
    type: FormFieldType.SELECT,
    label: 'Regulatory Compliance',
    name: 'regulatoryCompliance',
    information: 'Applicable regulatory requirements',
    placeholder: 'Select compliance requirements',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Compliance',
    teamResponsible: 'Compliance Team',
    options: [
      { value: 'gdpr', label: 'GDPR' },
      { value: 'hipaa', label: 'HIPAA' },
      { value: 'sox', label: 'Sarbanes-Oxley' },
      { value: 'pci', label: 'PCI DSS' }
    ],
    validations: {
      required: true
    },
    order: 12
  },
  {
    type: FormFieldType.TEXT,
    label: 'Business Process',
    name: 'businessProcess',
    information: 'Primary business process supported',
    placeholder: 'Enter business process',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Process',
    teamResponsible: 'Business Team',
    validations: {
      required: true,
      message: 'Business process is required'
    },
    order: 13
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Business Rules',
    name: 'businessRules',
    information: 'Key business rules applicable to the feed',
    placeholder: 'Enter business rules',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Rules',
    teamResponsible: 'Business Team',
    validations: {
      required: true,
      message: 'Business rules are required'
    },
    order: 14
  },
  {
    type: FormFieldType.SELECT,
    label: 'Data Retention Period',
    name: 'dataRetentionPeriod',
    information: 'Required data retention period',
    placeholder: 'Select retention period',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_PROFILE,
    metadataCategory: 'Data Governance',
    teamResponsible: 'Data Governance',
    options: [
      { value: '1y', label: '1 Year' },
      { value: '3y', label: '3 Years' },
      { value: '5y', label: '5 Years' },
      { value: '7y', label: '7 Years' },
      { value: 'permanent', label: 'Permanent' }
    ],
    validations: {
      required: true
    },
    order: 15
  },

  // FEED TECHNICAL DATA (15 fields)
  {
    type: FormFieldType.SELECT,
    label: 'Source System Type',
    name: 'sourceSystemType',
    information: 'Type of source system',
    placeholder: 'Select source system type',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Source Configuration',
    teamResponsible: 'Data Engineering',
    options: [
      { value: 'database', label: 'Database' },
      { value: 'api', label: 'API' },
      { value: 'file', label: 'File System' },
      { value: 'streaming', label: 'Streaming Platform' }
    ],
    validations: {
      required: true
    },
    order: 16
  },
  {
    type: FormFieldType.TEXT,
    label: 'Source System Path',
    name: 'sourceSystemPath',
    information: 'Path or endpoint of source system',
    placeholder: 'Enter source system path',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Source Configuration',
    teamResponsible: 'Data Engineering',
    validations: {
      required: true,
      message: 'Source system path is required'
    },
    order: 17
  },
  {
    type: FormFieldType.SELECT,
    label: 'Data Format',
    name: 'dataFormat',
    information: 'Format of the data',
    placeholder: 'Select data format',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Data Specification',
    teamResponsible: 'Data Engineering',
    options: [
      { value: 'csv', label: 'CSV' },
      { value: 'json', label: 'JSON' },
      { value: 'avro', label: 'Avro' },
      { value: 'parquet', label: 'Parquet' },
      { value: 'xml', label: 'XML' }
    ],
    validations: {
      required: true
    },
    order: 18
  },
  {
    type: FormFieldType.SELECT,
    label: 'Ingestion Pattern',
    name: 'ingestionPattern',
    information: 'Pattern for data ingestion',
    placeholder: 'Select ingestion pattern',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Ingestion',
    teamResponsible: 'Data Engineering',
    options: [
      { value: 'batch', label: 'Batch Processing' },
      { value: 'streaming', label: 'Real-time Streaming' },
      { value: 'micro-batch', label: 'Micro-batch' },
      { value: 'cdc', label: 'Change Data Capture' }
    ],
    validations: {
      required: true
    },
    order: 19
  },
  {
    type: FormFieldType.NUMBER,
    label: 'Expected Volume',
    name: 'expectedVolume',
    information: 'Expected data volume per load (in GB)',
    placeholder: 'Enter expected volume',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Performance',
    teamResponsible: 'Data Engineering',
    validations: {
      required: true,
      min: 0,
      max: 1000,
      message: 'Volume must be between 0 and 1000 GB'
    },
    order: 20
  },
  {
    type: FormFieldType.SELECT,
    label: 'Processing Engine',
    name: 'processingEngine',
    information: 'Engine used for data processing',
    placeholder: 'Select processing engine',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Processing',
    teamResponsible: 'Data Platform',
    options: [
      { value: 'spark', label: 'Apache Spark' },
      { value: 'flink', label: 'Apache Flink' },
      { value: 'databricks', label: 'Databricks' },
      { value: 'synapse', label: 'Azure Synapse' }
    ],
    validations: {
      required: true
    },
    order: 21
  },
  {
    type: FormFieldType.TEXT,
    label: 'Schema Registry',
    name: 'schemaRegistry',
    information: 'Schema registry location',
    placeholder: 'Enter schema registry path',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Schema Management',
    teamResponsible: 'Data Engineering',
    validations: {
      required: true,
      message: 'Schema registry path is required'
    },
    order: 22
  },
  {
    type: FormFieldType.SELECT,
    label: 'Data Quality Framework',
    name: 'dataQualityFramework',
    information: 'Framework used for data quality checks',
    placeholder: 'Select data quality framework',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Data Quality',
    teamResponsible: 'Data Quality',
    options: [
      { value: 'great-expectations', label: 'Great Expectations' },
      { value: 'deequ', label: 'AWS Deequ' },
      { value: 'griffin', label: 'Apache Griffin' },
      { value: 'custom', label: 'Custom Framework' }
    ],
    validations: {
      required: true
    },
    order: 23
  },
  {
    type: FormFieldType.TEXT,
    label: 'Target Storage Location',
    name: 'targetStorageLocation',
    information: 'Storage location for processed data',
    placeholder: 'Enter storage location path',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Storage',
    teamResponsible: 'Data Platform',
    validations: {
      required: true,
      message: 'Storage location is required'
    },
    order: 24
  },
  {
    type: FormFieldType.SELECT,
    label: 'Encryption Method',
    name: 'encryptionMethod',
    information: 'Data encryption method',
    placeholder: 'Select encryption method',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Security',
    teamResponsible: 'Security',
    options: [
      { value: 'aes256', label: 'AES-256' },
      { value: 'rsa2048', label: 'RSA-2048' },
      { value: 'tls12', label: 'TLS 1.2' },
      { value: 'none', label: 'No Encryption' }
    ],
    validations: {
      required: true
    },
    order: 25
  },
  {
    type: FormFieldType.TEXT,
    label: 'Authentication Method',
    name: 'authenticationMethod',
    information: 'Method used for authentication',
    placeholder: 'Enter authentication method',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Security',
    teamResponsible: 'Security',
    validations: {
      required: true,
      message: 'Authentication method is required'
    },
    order: 26
  },
  {
    type: FormFieldType.SELECT,
    label: 'Data Compression',
    name: 'dataCompression',
    information: 'Compression method for data storage',
    placeholder: 'Select compression method',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Storage',
    teamResponsible: 'Data Engineering',
    options: [
      { value: 'gzip', label: 'GZIP' },
      { value: 'snappy', label: 'Snappy' },
      { value: 'lz4', label: 'LZ4' },
      { value: 'none', label: 'No Compression' }
    ],
    validations: {
      required: true
    },
    order: 27
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Technical Dependencies',
    name: 'technicalDependencies',
    information: 'Technical dependencies for the feed',
    placeholder: 'Enter technical dependencies',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Dependencies',
    teamResponsible: 'Data Engineering',
    validations: {
      required: true,
      message: 'Technical dependencies must be specified'
    },
    order: 28
  },
  {
    type: FormFieldType.TEXT,
    label: 'API Version',
    name: 'apiVersion',
    information: 'Version of the API if applicable',
    placeholder: 'Enter API version',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Version Control',
    teamResponsible: 'Data Engineering',
    validations: {
      required: true,
      pattern: '^v\\d+(\\.\\d+)*$',
      message: 'API version must be in format v1.0.0'
    },
    order: 29
  },
  {
    type: FormFieldType.SELECT,
    label: 'Partitioning Strategy',
    name: 'partitioningStrategy',
    information: 'Strategy for data partitioning',
    placeholder: 'Select partitioning strategy',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_TECHNICAL,
    metadataCategory: 'Data Organization',
    teamResponsible: 'Data Engineering',
    options: [
      { value: 'date', label: 'Date Based' },
      { value: 'hash', label: 'Hash Based' },
      { value: 'range', label: 'Range Based' },
      { value: 'none', label: 'No Partitioning' }
    ],
    validations: {
      required: true
    },
    order: 30
  },

  // FEED CONTROL DATA (15 fields)
  {
    type: FormFieldType.SELECT,
    label: 'SLA Category',
    name: 'slaCategory',
    information: 'Service Level Agreement category',
    placeholder: 'Select SLA category',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Service Level',
    teamResponsible: 'Operations',
    options: [
      { value: 'platinum', label: 'Platinum (99.99%)' },
      { value: 'gold', label: 'Gold (99.9%)' },
      { value: 'silver', label: 'Silver (99.5%)' },
      { value: 'bronze', label: 'Bronze (99%)' }
    ],
    validations: {
      required: true
    },
    order: 31
  },
  {
    type: FormFieldType.NUMBER,
    label: 'Processing Window',
    name: 'processingWindow',
    information: 'Available processing window in minutes',
    placeholder: 'Enter processing window',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Operations',
    teamResponsible: 'Operations',
    validations: {
      required: true,
      min: 15,
      max: 1440,
      message: 'Processing window must be between 15 and 1440 minutes'
    },
    order: 32
  },
  {
    type: FormFieldType.SELECT,
    label: 'Monitoring Level',
    name: 'monitoringLevel',
    information: 'Level of monitoring required',
    placeholder: 'Select monitoring level',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Monitoring',
    teamResponsible: 'Operations',
    options: [
      { value: 'high', label: 'High (Real-time)' },
      { value: 'medium', label: 'Medium (Near real-time)' },
      { value: 'low', label: 'Low (Periodic)' }
    ],
    validations: {
      required: true
    },
    order: 33
  },
  {
    type: FormFieldType.SELECT,
    label: 'Alert Priority',
    name: 'alertPriority',
    information: 'Priority level for alerts',
    placeholder: 'Select alert priority',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Monitoring',
    teamResponsible: 'Operations',
    options: [
      { value: 'p1', label: 'P1 - Critical' },
      { value: 'p2', label: 'P2 - High' },
      { value: 'p3', label: 'P3 - Medium' },
      { value: 'p4', label: 'P4 - Low' }
    ],
    validations: {
      required: true
    },
    order: 34
  },
  {
    type: FormFieldType.TEXT,
    label: 'Alert Recipients',
    name: 'alertRecipients',
    information: 'Email distribution list for alerts',
    placeholder: 'Enter email addresses',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Notifications',
    teamResponsible: 'Operations',
    validations: {
      required: true,
      pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}(,\\s*[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})*$',
      message: 'Enter valid email addresses separated by commas'
    },
    order: 35
  },
  {
    type: FormFieldType.SELECT,
    label: 'Recovery Point Objective',
    name: 'rpo',
    information: 'Maximum acceptable data loss period',
    placeholder: 'Select RPO',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Disaster Recovery',
    teamResponsible: 'Operations',
    options: [
      { value: '0', label: 'Zero (No data loss)' },
      { value: '15m', label: '15 Minutes' },
      { value: '1h', label: '1 Hour' },
      { value: '4h', label: '4 Hours' },
      { value: '24h', label: '24 Hours' }
    ],
    validations: {
      required: true
    },
    order: 36
  },
  {
    type: FormFieldType.SELECT,
    label: 'Recovery Time Objective',
    name: 'rto',
    information: 'Maximum acceptable downtime',
    placeholder: 'Select RTO',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Disaster Recovery',
    teamResponsible: 'Operations',
    options: [
      { value: '1h', label: '1 Hour' },
      { value: '4h', label: '4 Hours' },
      { value: '8h', label: '8 Hours' },
      { value: '24h', label: '24 Hours' }
    ],
    validations: {
      required: true
    },
    order: 37
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Data Quality Rules',
    name: 'dataQualityRules',
    information: 'Data quality validation rules',
    placeholder: 'Enter data quality rules',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Data Quality',
    teamResponsible: 'Data Quality',
    validations: {
      required: true,
      message: 'Data quality rules are required'
    },
    order: 38
  },
  {
    type: FormFieldType.NUMBER,
    label: 'Quality Threshold',
    name: 'qualityThreshold',
    information: 'Minimum acceptable data quality score (%)',
    placeholder: 'Enter quality threshold',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Data Quality',
    teamResponsible: 'Data Quality',
    validations: {
      required: true,
      min: 0,
      max: 100,
      message: 'Threshold must be between 0 and 100'
    },
    order: 39
  },
  {
    type: FormFieldType.SELECT,
    label: 'Audit Level',
    name: 'auditLevel',
    information: 'Level of auditing required',
    placeholder: 'Select audit level',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Audit',
    teamResponsible: 'Compliance',
    options: [
      { value: 'full', label: 'Full Audit' },
      { value: 'changes', label: 'Changes Only' },
      { value: 'minimal', label: 'Minimal' },
      { value: 'none', label: 'No Audit' }
    ],
    validations: {
      required: true
    },
    order: 40
  },
  {
    type: FormFieldType.TEXT,
    label: 'Retention Policy',
    name: 'retentionPolicy',
    information: 'Data retention policy identifier',
    placeholder: 'Enter retention policy',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Governance',
    teamResponsible: 'Data Governance',
    validations: {
      required: true,
      message: 'Retention policy is required'
    },
    order: 41
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Control Framework',
    name: 'controlFramework',
    information: 'Control framework details',
    placeholder: 'Enter control framework details',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Governance',
    teamResponsible: 'Data Governance',
    validations: {
      required: true,
      message: 'Control framework details are required'
    },
    order: 42
  },
  {
    type: FormFieldType.SELECT,
    label: 'Change Control Level',
    name: 'changeControlLevel',
    information: 'Level of change control required',
    placeholder: 'Select change control level',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Change Management',
    teamResponsible: 'Change Management',
    options: [
      { value: 'strict', label: 'Strict (CAB Approval)' },
      { value: 'normal', label: 'Normal (Manager Approval)' },
      { value: 'light', label: 'Light (Team Lead Approval)' }
    ],
    validations: {
      required: true
    },
    order: 43
  },
  {
    type: FormFieldType.TEXT,
    label: 'Version Control Repository',
    name: 'versionControlRepo',
    information: 'Version control repository URL',
    placeholder: 'Enter repository URL',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Version Control',
    teamResponsible: 'Development',
    validations: {
      required: true,
      message: 'Repository URL is required'
    },
    order: 44
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Control Metrics',
    name: 'controlMetrics',
    information: 'Key control metrics to be tracked',
    placeholder: 'Enter control metrics',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_CONTROL,
    metadataCategory: 'Metrics',
    teamResponsible: 'Operations',
    validations: {
      required: true,
      message: 'Control metrics are required'
    },
    order: 45
  },

  // FEED SUPPORT DATA (15 fields)
  {
    type: FormFieldType.TEXT,
    label: 'Primary Support Contact',
    name: 'primarySupportContact',
    information: 'Primary support contact details',
    placeholder: 'Enter primary contact',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Support Contacts',
    teamResponsible: 'Support',
    validations: {
      required: true,
      message: 'Primary support contact is required'
    },
    order: 46
  },
  {
    type: FormFieldType.TEXT,
    label: 'Secondary Support Contact',
    name: 'secondarySupportContact',
    information: 'Secondary support contact details',
    placeholder: 'Enter secondary contact',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Support Contacts',
    teamResponsible: 'Support',
    validations: {
      required: true,
      message: 'Secondary support contact is required'
    },
    order: 47
  },
  {
    type: FormFieldType.SELECT,
    label: 'Support Level',
    name: 'supportLevel',
    information: 'Level of support provided',
    placeholder: 'Select support level',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Support Level',
    teamResponsible: 'Support',
    options: [
      { value: '24x7', label: '24x7 Support' },
      { value: '8x5', label: 'Business Hours' },
      { value: 'basic', label: 'Basic Support' }
    ],
    validations: {
      required: true
    },
    order: 48
  },
  {
    type: FormFieldType.TEXT,
    label: 'Support Hours',
    name: 'supportHours',
    information: 'Hours when support is available',
    placeholder: 'Enter support hours',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Support Schedule',
    teamResponsible: 'Support',
    validations: {
      required: true,
      message: 'Support hours are required'
    },
    order: 49
  },
  {
    type: FormFieldType.TEXT,
    label: 'Escalation Path',
    name: 'escalationPath',
    information: 'Support escalation hierarchy',
    placeholder: 'Enter escalation path',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Escalation',
    teamResponsible: 'Support',
    validations: {
      required: true,
      message: 'Escalation path is required'
    },
    order: 50
  },
  {
    type: FormFieldType.TEXT,
    label: 'Support Team',
    name: 'supportTeam',
    information: 'Team responsible for support',
    placeholder: 'Enter support team',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Support Team',
    teamResponsible: 'Support',
    validations: {
      required: true,
      message: 'Support team is required'
    },
    order: 51
  },
  {
    type: FormFieldType.TEXT,
    label: 'Knowledge Base Link',
    name: 'knowledgeBaseLink',
    information: 'Link to support documentation',
    placeholder: 'Enter KB link',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Documentation',
    teamResponsible: 'Support',
    validations: {
      required: true,
      pattern: '^https?://.*',
      message: 'Valid URL is required'
    },
    order: 52
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Known Issues',
    name: 'knownIssues',
    information: 'List of known issues and workarounds',
    placeholder: 'Enter known issues',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Issues',
    teamResponsible: 'Support',
    validations: {
      required: true,
      message: 'Known issues documentation is required'
    },
    order: 53
  },
  {
    type: FormFieldType.TEXT,
    label: 'Monitoring Dashboard',
    name: 'monitoringDashboard',
    information: 'Link to monitoring dashboard',
    placeholder: 'Enter dashboard URL',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Monitoring',
    teamResponsible: 'Operations',
    validations: {
      required: true,
      pattern: '^https?://.*',
      message: 'Valid URL is required'
    },
    order: 54
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Recovery Procedures',
    name: 'recoveryProcedures',
    information: 'Steps for disaster recovery',
    placeholder: 'Enter recovery procedures',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Disaster Recovery',
    teamResponsible: 'Operations',
    validations: {
      required: true,
      message: 'Recovery procedures are required'
    },
    order: 55
  },
  {
    type: FormFieldType.TEXT,
    label: 'Incident Management System',
    name: 'incidentManagementSystem',
    information: 'System used for incident tracking',
    placeholder: 'Enter incident management system',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Incident Management',
    teamResponsible: 'Support',
    validations: {
      required: true,
      message: 'Incident management system is required'
    },
    order: 56
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Maintenance Procedures',
    name: 'maintenanceProcedures',
    information: 'Regular maintenance procedures',
    placeholder: 'Enter maintenance procedures',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Maintenance',
    teamResponsible: 'Operations',
    validations: {
      required: true,
      message: 'Maintenance procedures are required'
    },
    order: 57
  },
  {
    type: FormFieldType.TEXT,
    label: 'Training Resources',
    name: 'trainingResources',
    information: 'Links to training materials',
    placeholder: 'Enter training resources',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Training',
    teamResponsible: 'Training',
    validations: {
      required: true,
      message: 'Training resources are required'
    },
    order: 58
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Support SLAs',
    name: 'supportSLAs',
    information: 'Support Service Level Agreements',
    placeholder: 'Enter support SLAs',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'SLA',
    teamResponsible: 'Support',
    validations: {
      required: true,
      message: 'Support SLAs are required'
    },
    order: 59
  },
  {
    type: FormFieldType.TEXT,
    label: 'Change Management Process',
    name: 'changeManagementProcess',
    information: 'Process for handling changes',
    placeholder: 'Enter change management process',
    required: true,
    feedDataCategory: FeedDataCategory.FEED_SUPPORT,
    metadataCategory: 'Change Management',
    teamResponsible: 'Change Management',
    validations: {
      required: true,
      message: 'Change management process is required'
    },
    order: 60
  }
]; 
export const groupFieldsByCategory = (fields: FormField[]): FormSection[] => {
    // First group fields by category using a Map
    const groupedMap = fields.reduce((groups, field) => {
      const category = field.feedDataCategory;
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)?.push(field);
      return groups;
    }, new Map<FeedDataCategory, FormField[]>());
  
    // Convert Map to FormSection array with proper titles
    return Array.from(groupedMap.entries()).map(([category, fields]) => ({
      title: formatCategoryTitle(category),
      category,
      fields: fields.sort((a, b) => a.order - b.order)
    }));
  };
  
  const formatCategoryTitle = (category: FeedDataCategory): string => {
    // Convert FEED_PROFILE to "Feed Profile Data"
    return category
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ') + ' Data';
  };