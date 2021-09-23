const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let teamDataArray = [];

const addTeamMember = teamData => {
    return inquirer
        .prompt([
        {
            name: 'employeeType',
            message: 'Which type of employee would you like to add?',
            type: 'rawlist',
            choices: ['Manager', 'Engineer', 'Intern']
        }
        ])
        .then(response => {
            if (response.employeeType === 'Engineer') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'engineerName',
                        message: "Enter your Engineer's name:",
                    },
                    {
                        type: 'input',
                        name: 'engineerId',
                        message: "Enter your Engineer's ID:"
                    },
                    {
                        type: 'input',
                        name: 'engineerEmail',
                        message: "Enter your Engineer's email address:"
                    },
                    {
                        type: 'input',
                        name: 'engineerGithub',
                        message: "Enter your Engineer's GitHub username:"
                    },
                    {
                        type: 'confirm',
                        name: 'confirmAddTeamMember',
                        message: 'Would you like to add another employee?'
                    },
                ])
                .then(response => {
                    let newEngineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub)

                    teamDataArray.push(newEngineer);

                    if (response.confirmAddTeamMember) {
                        addTeamMember();
                    }
                    else {
                        writeToHTML();
                    }
                })
            }
            if (response.employeeType === 'Intern') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'internName',
                        message: "Enter your Intern's name:",
                    },
                    {
                        type: 'input',
                        name: 'internId',
                        message: "Enter your Intern's ID:"
                    },
                    {
                        type: 'input',
                        name: 'internEmail',
                        message: "Enter your Intern's email address:"
                    },
                    {
                        type: 'input',
                        name: 'internSchool',
                        message: "Enter your Intern's school name:"
                    },
                    {
                        type: 'confirm',
                        name: 'confirmAddTeamMember',
                        message: 'Would you like to add another employee?'
                    },
                ])
                .then(response => {
                    let newIntern = new Intern(response.internName, response.internId, response.internEmail,response.internSchool)

                    teamDataArray.push(newIntern);  

                    if (response.confirmAddTeamMember) {
                        addTeamMember();
                    }
                    else {
                        writeToHTML();
                    }
                })
            }
            if (response.employeeType === 'Manager') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'managerName',
                        message: "Enter your Manager's name:",
                    },
                    {
                        type: 'input',
                        name: 'managerId',
                        message: "Enter your Manager's ID:"
                    },
                    {
                        type: 'input',
                        name: 'managerEmail',
                        message: "Enter your Manager's email address:"
                    },
                    {
                        type: 'input',
                        name: 'managerOfficeNumber',
                        message: "Enter your Manager's office number:"
                    },
                    {
                        type: 'confirm',
                        name: 'confirmAddTeamMember',
                        message: 'Would you like to add another employee?'
                    },
                ])
                .then(response => {
                    let newManager = new Manager(response.managerName, response.managerId, response.managerEmail,response.managerOfficeNumber)

                    teamDataArray.push(newManager);  

                    if (response.confirmAddTeamMember) {
                        addTeamMember();
                    }
                    else {
                        writeToHTML();
                    }
                })
            }
        })
}

addTeamMember();

function writeToHTML() {
    fs.writeFile("team.html", render(teamDataArray), err => err ? console.log(err) : console.log('Heres your new file!'))
}