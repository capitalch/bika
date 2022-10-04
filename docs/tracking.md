## React-Form plans
@. Create validations array in jsonForm and give its effect in Interface
@. Implement validateItem and validateItems in utils. Parms are (item, store). For each validation in item's validations array call corresponding validator and set store errors against that item
@. From onChange and onBlur events of formComponent call validateItem
@. At react form level export validateItems. Think whether to provide this in utils file. At external submit this will be available
@. A message map for all form level messages
@. Typescript enumerator for all validatiors
@. Provide Typescript types for all 'any' keyword




## Provide in XX-grid
																									.. Add method and logic for its display
.. Search logic
																									.. view row logic
																									.. Delete logic add confirm message
																									.. With no data add is not visible because data grid is not visible
																									-- disable onclick selection

																									1. Edit
																									2. Delete
																									.. Print
																									3. Add
																									4. Search
																									5. Selection
																									6. Title
																									7. subtitle

																									9. id swap
																									10. header color
																									11. View no of rows
																									12. Refresh
13. Summary footer
																									14. Normal buttons
																									15. Remove some buttons when below MD isMediumSizeDown

## Login
1. Super admin users: a) Create tenant and database schema b) Create admin user and associate with tenant
2. Admin user: a) change uid, b) change pwd c) manage business user, d) manage roles e) Associate users with roles f) Associate users with branches
3. Business user: a) change uid b) change pwd
4. Forgot password with login
# Logic
1. Provide selection-criteria in headers as dbSchemaName:branchId
2. At server accordingly switch schema and inject branchId in args
3. Provide subHeader to show: BreadCrumb, company name, branch, branch selection control

## UI masters grouping
1. Discrete->States, Cities, Units of measurement, 
2. Customers
3. Branch->Branches, Halls, Departments
4. Food items->Menu, Menu items
5. Company info
6. Types->Date types, Event types, Time slots, 
7. Booking->Booking actions, Booking status

## to do
1. Formulate login
2. On successful login show central and side bar
3. Server side implementation of login
4. Implement Super admin, Admin user
5. Formulate masters entry
5. Validate DB design


## Timeline
Client, server, database setup:			31-08-2022
Client / Server side framework ready:	10-09-2022
All masters entry:						30-09-2022
Booking design:							10-10-2022



# Server side
		1. Implement GraphQL
2. Implement Postgresql query framework
3. Deploy react app at server using graphQL query to fetch db record
4. Create entities
5. User authentication
																										6. Error handling framework
																										7. Deployment
8. Basic api's creation
																										7. logging

# client side
																										1. Container
2. Material theme
3. GraphQL
4. Menu system and loading a component
5. Error handling
6. finalize forms and validations with formik and yup

# Database
1. Create tables for Kater
2. Create tables for authentication database

																										# Research
																										1. Check in database if without sequence auto increment id is possible. yes possible.
# 13-09-2022: 4 hrs
1. Data retrieval strategy and super admin clients: 4 hrs

# 12-09-2022: Mon 4 hrs
1. Super admin authentication etc.

# 11-09-2022: Sun: 8 hrs
1. Authentication for Super admin
2. Error throw at client and server
3. Wizard research

# 10-09-2022: Sat: 6 hrs
1. Logging: 2 hrs
2. Server side error validations and implementation of pycopg2: 2 hrs
3. Client and server side error mecanisms: 2 hrs

# 07-09-2022 - 09-09-2022: 2 hrs
1. Research over new technology in React
2. Login: 2 hrs

# 06-09-2022: Tue
1. Afternoon: Completed error handling and logging at server					:						1 hrs

# 05-09-2022: Mon: 4 hrs
1. Morning	: Graphql client side 												:						2 hrs
2. Afternoon: Graphql client													:						1 hrs
3. Night	: Error handling at server											:						1 hrs

# 04-09-2022: Sun: 9 hrs
1. Morning	: UI login / logout													:						2 hrs
2. Afternoon: UI login / logout completed										:						2 hrs
3. Afternoon: Database validations												:						1 hrs
4. Evening	: States and Cities insert											:						1 hrs
5. Evening	: Planning for masters insert										:						1 hrs
6. Night	: Completed login / logout, started graphql client					:						2 hrs

# 03-09-2022: Sat: 8 HRS
1. Morning	: UI login 															:						2 hrs
2. Afternoon: UI login															:						2 hrs
3. Evening	: UI login 															:						4 hrs																										
# 02-09-2022: Fri: 9 hrs
1. Morning	: Further refined side bar 											:						1 hrs
2. Morning	: Reorganized, bug fix and cleanup									:						1 hrs
3. Afternoon: Database creation													:						2 hrs
4. Evening	: Meeting 															:						1 hrs
5. Evening	: Database creation													:						2 hrs
6. Night	: UI login 															:						2 hrs

# 01-09-2022: Thurs: 7 hrs
1. Morning	: Bug fixing side menu												: 						2 hrs
2. Afternoon: Component loading in side bar on click							:						2 hrs
3. Evening	: Cleanup, organize and bug fixing side bar 						:						1 hrs
4. Evening	: Persistent selection in side bar 									:						1 hrs
5. Night	: Research on Hookstate tool to be used with side bar local state 	:						1 hrs

## August: 73 hrs
# 31-08-2022: Wed: 7 hrs
1. Morning	: Working on Navigation header and side bar 						:						2 hrs
2. Afternoon: Side navigation bar 												:						2 hrs
3. Evening	: Side navigation menu implementation								:						2 hrs
4. Night	: Side navigation menu implementation and icons						:						1 hrs

# 30-08-2022: 8 hrs
1. Morning	: Navigation system design finalized								:						2 hrs
2. Afternoon: Working on navigation system										:						2 hrs
3. Evening	: Navigation system architecture with global state implemented		:						2 hrs
4. Night	: Global css styling and Header styling								:						2 hrs

# 29-08-2022: Mon: 4 hrs
1. Morning	: 	researched on material UI client side							:						0.5 hrs
2. Afternoon: 	Started client side container implementation					:						1.5 hrs
3. Night	:	Continued with client side implementation						:						2 hrs

# 28-08-2022: 9 hrs
1. Morning:		Database design continued, Whatsapp API research, Documentation	: 						2 hrs
2. Afternoon: 	Database design													:						3 hrs
3. Evening	:	Database design													:						1 hrs
4. Meeting	:	Meeting on UI and database										:						2 hrs
5. Night	:	Research on UI material fetch									:						1 hrs

# 27-08-2022: 9 hrs
1. Successful deployment of dev server and react client build at cloudjiffy and its configuration: 2 hrs
2. Successful implementation of logging: 2 hrs
3. Implemented redirect and graphql at server: 1 hrs
4. Database design: 4 hrs

# 26-08-2022: 4 hrs
1. Lab: Successfully implemented Ariadne with GraphQL in Flask server: 4 hrs

# 25-08-2022: 8 hrs
1. logging investigation completed: 2 hrs
2. Error management investigation completed: 4 hrs
3. Meeting: 1 hr
4. GraphQL: 1 hr
5. Created Python virtual ENV
6. Created database and app server in cloudjiffy

# 24-08-2022: 5 hrs
1. zeroed on Hookstate state management lib and finally tested it: 2 hrs
2. Configured cloudjiffy for server and database: 1 hrs
3. Hosted hello app at cloudjiffy server: 1 hrs
4. Logging investigation: 1 hrs

# 23-08-2022: 4 hrs
1. Research on various state management ways: 4 hrs

# 22-08-2022: 5 hrs
1. Research on state management. Investigated recoil: 5 hrs

# 20-08-2022 - 21-08-2022
off

# 19-08-2022: 2 hrs
1. Research on State management libraries. Zeroed on Recoil

# 18-08-2022: 2 hrs
1. Meeting: 2 hrs

# 15-08-2022: 3 hrs
1. Meeting: 3 hrs

# 03-08-2022: 2 hrs
1. Meeting: 2 hrs

# 31-07-2022: 1 hr
1. Meeting 1 hr