# Vimient Web Portal

## Contents

- [Auto Save Form](#auto-save-form)
- [Print](#print)
- [Assessments](#assessments)
  - [Holistic Assessment](#holistic-assessment)
  - [Medical Condition Disease Assessment](#medical-condition-disease-assessment)
  - [ADL Assessment](#adl-assessment)
    - [Lawton Brody ADL](#lawton-brody-adl)
    - [Katz Independence ADL](#katz-independence-adl)
  - [Caregiver Strain Assessment](#caregiver-strain-assessment)

---

## Auto Save Form

For Auto Save we have created a reuseable custome hook called **_useAutoSave_**.

```javascript
const {onChangeAutoSave, resetAutoSave} = useAutoSave({onSave: 'API call'});
```

### Functionality

- This hook is using the local storage (with the saga approach this might get changed) to store the timer value.
- On first-time onChange, the timer will get started for 60Sec(default), and after 60Sec form will get auto-saved and clear the LS and reset the timer.
- On unmounting for the hook, if the timer has already started then the form will get saved and the timer get reset.

### Usage

```javascript
const saveForm = () => {
  //asynch call
}
{
  onChangeAutoSave,
  resetAutoSave
} = useAutoSave({onSave: saveForm});

return(
  <div>
    <input onChange={() => onChangeAutoSave()} />
    <button onClick={() => {
      saveForm();
      resetAutoSave();
    }}>Save</button>
  </div>
);

```

## Auto Scroll to top of the first error of the form

For Auto Save we have created a reusable custom hook called **_useAutoScroll_**.

```javascript
const {ref, scrollToFirstError} = useAutoScroll();
```

### Functionality

- This custom hook return a method **_scrollToFirstError_** which we can call while submitting the form. It auto scrolls the user to the first error of the form while the user tries to submit the incomplete form.
- This custom hook returns the **_ref_** which we can attach to the main div element of the form. So, that our code will only search errors in a particular section.

### Usage

```javascript
const {ref, scrollToFirstError} = useAutoScroll();

function App() {
  const handleSubmit = () => {
    //submit logic
    scrollToFirstError();
  };

  return (
    <div ref={ref}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name='name' />
          </label>
        </fieldset>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
```

## Print

### Functionality

The Print functionality is implemented in four parts in the app:

1. **[Print Component](#print-component):** A component that is placed at the top level under redux provider, it is where our Template Renders.
2. **printHide Class:** It is a class that should be applied to any component in our app that should be hidden while using print feature. Right now it is applied to our original Header, Footer, App, Overlay Dialogs, Event Dialogs, etc.
3. **PrintButton:** This component should be placed wherever you want to show Print Button.
4. **[usePrint Hook](#useprint-hook):** This is a hook that needs to be called on any page where you want to add the print feature.

> **Note** > `Cmd + P` or `Ctrl + P` will Print Template wherever PrintButton is visible. Otherwise it will do default Print.
> When this Print runs, it first set additional styling to global css which modifies the pageSize, hides app ui & renders template.

### Usage

Changes to be made under `src/common/Print` folder:

- Add Template to `Print/templates` folder. This template should accept a prop named `data`.
- Add template type to the global enum `PrintTemplates`.
- #### Print Component
  Add Template Type under Switch Case inside Print Component:
  ```javascript
  switch (type) {
    case PrintTemplates.Holistic:
      // Whatever Should Repeat At Top of Every Page
      HeaderContent = () => (
        <Box className='common-header-wrapper'>
          <Header>Holistic Assessment</Header>
          <MetaBox data={parseAssessmentMetaData(meta)} />
        </Box>
      );
      // Template
      FrameContent = () => <HolisticAssessmentTemplate data={data} />;
  }
  ```
- #### usePrint Hook
  Add usePrint Hook to the Component to which Print Functionality needs to be added & Pass the Data to it.
  ```javascript
  usePrint(
    (type: PrintTemplates.Holistic),
    (meta: metaData),
    (data: surveyStateData),
  );
  ```
  **type:** The type of Template that needs to be rendered.  
  **meta:** The info that needs to be shown at top of every page inside components like MetaBox.  
  **data:** The data that needs to be passed to the template.

## Assessments

### Holistic Assessment

### Functionality

- Display surveys and results for different sections.
- The assessment survey will have 1 -> M question within four sections :

  - Emotional

  - Intellectual

  - Physical

  - Spiritual

- Every question has the possibility of three responses

  - Never

  - Sometimes

  - Always

- Every response will be scored :

  - Always : 3

  - Sometimes : 2

  - Never : 1

- The agent should be able to initiate a assessment when needed.
- The results section contains the following values.

  - There will be a total score at the end of each section

  - There will be a total score for the entire survey

- The survey will have three buttons :

  - Save

    - Saves all of the responses in a database

  - Submit

    - Submits all responses to the database and sets the completed date

  - Reset

    - Has a alert pop up to confirm

    - Resets all responses currently on the page and incomplete responses saved in a database

- A survey can’t be submitted unless every question has an answer. If the submit button is hit and something is not filled in, then we will show the user what is missing.
- User completes the a new or saved Holistic form and clicks on the **Submit** button, then form will be saved/written to the “Previous Holistic Assessments” section below.
- The user can click on the **View** link for each of the individual assessment to review the results of past submissions. Prior submissions cannot be edited or deleted.
- When the user clicks on the **View** link to review a prior assessment then form will be displayed with all responses visible along with a CLOSE button. The prior assessments date/time will also be displayed at the top of the form.
- When the user clicks the CLOSE button, the assessment will close and the system will display the most current saved or submitted Holistic assessment.

### Medical Condition Disease Assessment

This assessment is related to medical condition of senior

### Functionality

- Medical conditions will be searched with the help of search input field.
- As we type atleast 3 character into the searchBar, Then we get list of medical condition populating into the dropdown.
- After choosing proper medical condition press **Add Medical Condition** button to add medical condition into the table.
- Update the table values accordingly.
- Press **Save** button to keep record updated.
  - Then we get **draft** inFront of version and date get updated with latest date.
  - Incomplete tag will be displayed at the top-right corner.
- Press **Submit** button to submit the assessment.
  - Has a alert pop up to confirm
  - Form will get disable and version will be updated.
  - Edit button get enabled, Click **Edit** button to make any changes in the assessment.
- Press **Cancel** button to clear the changes made so far till the last submitted assessment.
  - Has a alert pop up to confirm
  - Reset the current changes and redirect to the last submitted version
- The record of previously submitted assessments was kept in a seperate table at bottom.
  - To view any previously submitted assessment click on **view** button displayed along with the record.
  - When the user clicks on the **View** link to review a prior assessment then form will be displayed with all responses visible along with a CLOSE button. The prior assessments date/time will also be displayed at the top of the form.
  - Click **Close** button to get back to the latest version of assessment.

## ADL Assessment

## Lawton Brody ADL

- User can capture their responses to specific ADL questions and determine the level of independence for the senior.

#### Functionality

- The assessment will contain the following activity areas:
  - A. Ability to Use Telephone
  - B. Food Preparation
  - C. Food Preparation
  - D. Housekeeping
  - E. Laundry
  - F. Mode of Transportation
  - G. Responsibility for Own Medications
  - H. Ability to Handle Finances
  - Total Score
- For each of the above activity areas (i.e. A-H), the user is only able to select one response.
- The leading numeric score values (0 or 1) for each of the response options.
- Once the all 8 responses are captured, accumulate the overall score and display it at the bottom of the assessment form just above the Save/Submit/Clear buttons.
- Score is calculated by adding the corresponding points based on the selection in each activity area.
- User can **SAVE** their unfinished progress within the form and return to complete it at a later time.
- User can **SUBMIT** their completed form which will be maintained within a completed assessments history section called “**Previous Lawton-Brody Assessments**”.
- The Previous Completed Assessments will display the last 30 submissions then be moved to archive.
- User cannot complete more than one assessment per day. 24 hour period.
- By clicking on the **View** link, the user is able to view the previously submitted assessment.

### Katz Independence ADL

- The user can capture their responses to specific ADL questions and determine the level of independence for the senior.

#### Functionality

- The Katz assessment will contain the following activity areas:
  - Bathing
  - Dressing
  - Toileting
  - Transferring
  - Continence
  - Feeding
  - Total Score
- For each of the above sections (i.e. A-H), the user is only able to select one response.
- The leading numeric score values (0 or 1) for each of the response options.
- Once the all 6 responses are captured, accumulate the overall score and display it at the bottom of the assessment form just above the Save and Submit/Clear buttons.
- Score is calculated by adding the corresponding points based on the selection in each section.
- User can **SAVE** their unfinished progress within the form and return to complete it at a later time.
- User can **SUBMIT** their completed form which will be maintained within a completed assessments history section called “Previous Katz Index of Independence in ADL”.
- The Previous Completed Assessments will display the last 30 submissions then be moved to archive.
- User cannot complete more than one assessment per day. 24 hour period.
- By clicking on the **VIEW** link, the user is able to view the previously submitted assessment.

## Caregiver Strain Assessment

### Functionality

- Each time the user accesses the **CG Stain** Assessment page, automatically load and display the most current assessment.
- The **Caregiver Strain Assessment** will contain 13 questions with each having three possible responses:
  - **Yes, On a Regular Basis** = **2** points
  - **Yes, Sometimes** = **1** point
  - **No** = **0** points
- The **CG Strain** assessment will not be available until the user first SELECT CAREGIVER from the dropdown menu. Once selected, the form will become available for input.
- User must select one of the three responses for each individual question (mandatory/required response). Only one response per question.
- For each of the 3 response columns, display the total number of RESPONSE COUNTS at the bottom of the form.
- For each of the 3 response columns, display the total accumulated POINTS at the bottom of the form.
- Total score will be calculated and displayed at the bottom of the completed form. Score will show overall percent based on 26 total points possible.
- User can click on the **Reset** button to remove any previously entered responses.
- User clicks on the **Save** button anytime, it will save/maintain the current entries within the form with incomplete tag.
- User clicks on the **Submit** button and has not provided a response for each of the 13 questions, highlight those questions in RED font that do not have a selected response.
- User completes the a new or saved CSA form and clicks on the **Submit** button, then form will be saved/written to the “Previous Caregiver Assessments” section below.
- The user can click on the **View** link for each of the individual assessment to review the results of past submissions. Prior submissions cannot be edited or deleted.
- When the user clicks on the **View** link to review a prior assessment then form will be displayed with all responses visible along with a **Close** button. The prior assessments date/time will also be displayed at the top of the form.
- When the user clicks the **Close** button, the assessment will close and the system will display the most current saved or submitted Caregiver Strain assessment.

## useFacilityBreadcrumbs

Hook to store the API logic and fetch the breadcrumbs options for FacilityBreadcrumbs **_useFacitlityBreadcrumb_**

```javascript
const {options, isLoading} = useFacitlityBreadcrumb();
```
