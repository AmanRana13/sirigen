class AssessmentMetaDataModel {
  name: string = '';
  preferredName: string = '';
  accountId: string = '';
  age: string = '';
  gender: string = '';
  dateTime: string = '';
  careAgentName: string = '';
  status: string = '';
  caregiverName?: string = '';
  version?: string = '';
  constructor(
    name: string = '',
    preferredName: string = '',
    accountId: string = '',
    age: string = '',
    gender: string = '',
    dateTime: string = '',
    careAgentName: string = '',
    status: string = '',
    caregiverName: string = '',
    version: string = ''
  ) {
    this.name = name;
    this.preferredName = preferredName;
    this.accountId = accountId;
    this.age = age;
    this.gender = gender;
    this.dateTime = dateTime;
    this.careAgentName = careAgentName;
    this.status = status;
    this.caregiverName = caregiverName;
    this.version = version;
  }
}

export default AssessmentMetaDataModel;
