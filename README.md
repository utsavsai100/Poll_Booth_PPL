# Poll Booth
Vikram and Pavithra want to decide upon a design for Delta T Shirt. They decided to put up a poll among Delta members to select a design. So they asked their juniors to develop a portal which facilitates polling among teams.

They need a website which allows creation of teams and polls within the team members built upon a full fledged frontend and backend.

## Setup and Getting Started
1. Download or clone this repo to your local system.
2. For this repo, you have to create your own `config.env` file or rename the `config.txt` file to `config.env`, which is provided as an example for the contents to be filled in .env file.
3. After this, open the terminal and run the following command to download all the dependencies.
```
npm install
```
4. After downloading all the dependencies, run the following command in the terminal.
```
npm run start
```
5. Now, navigate to http://localhost:3000

## Normal Mode:
- [x] Have a user management system with authentication that allows users to register and login on the site.
- [x] Create a team and be able to invite users to the team.
- [x] Create a poll with variable number of text options within the team.
- [x] Create a dashboard for a team and display the polls in chronological order.
- [x] Show the results of poll after admin ends it.
- [x] Design a neat, intuitive UI ( make the site responsive, legible text, etc ).

## Hacker Mode:
- [x] Have a deadline for automatically ending polls.
- [x] Support for different types of options such as images, audio and video.
- [x] Notifications to the admin when someone submits a vote, joins their team using invite, etc.
- [x] Validate the registration forms (check for duplicate usernames, determine password strength, etc).
- [x] Add plots/graphs to visualize results of polls.
- [ ] Prevent SQL injection.

## Hacker Mode++:
- [x] Ability to add multiple admins and user roles (like teachers, CR, students etc).
- [x] Send notifications through email.
- [x] Google Calendar API integration to keep track of deadlines for polls.
- [x] Add real time chat feature.
- [ ] Add real time video conferencing feature.