import React from 'react'

const SidebarNavigation = (props) => {

  const surveyCategory = {
    'customerSatisfaction': 'Customer satisfaction',
    'feedback': 'Feedback',
    'research': 'Research',
    'quiz': 'Quiz',
    'evaluation': 'Evaluation',
    'registrationForm': 'Registration Form',
    'applicationForm': 'Application Form',
    'polls': 'Polls',
    'demographics': 'Demographics',
    'educational': 'Educational',
    'industrySpecific': 'Industry Specific',
    'forFun': 'For fun',
    'invitation': 'Invitation',
    'political': 'Political',
    'others': 'Others'
  }
  
  const CategoriesToShow = props.categories.map(category => (
    <li key={category} className={props.currentCategory === category ? 'active' : ''}>
      <span onClick={() => props.switchCategories(category)}>{surveyCategory[category]}</span>
    </li>
  ))
  const NoCategory = [(
    <p>No category because you have no surveys yet. Create a survey now.</p>
  )]
  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
            <h3> </h3>
        </div>
        <ul className="list-unstyled components">
          <p className='text-underline'>Your categories</p>
          <li className={props.currentCategory === 'all' ? 'active' : ''}>
            <span onClick={() => props.switchCategories('all')}>All surveys</span>
          </li>
          {CategoriesToShow.length ? CategoriesToShow : NoCategory}
        </ul>
      </nav>
    </div>
  )
}

export default SidebarNavigation