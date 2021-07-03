# Gear Track App
App to track gear for hiking and climbing 

### Completed Tasks
- JS functionality of signup/login form ✅
- finish Auth - Login/Logout/Forgot ✅
- Notes being saved to Firebase ✅
- Update flow to show Login/Sign Up until the user is logged ✅
  - Update to react-navigation 5.x ✅
- add prettier/eslint/husky config ✅
- update to use absolute paths using expo specific pkg - babel-plugin-module-resolver ✅
- Navigation Updates ✅
  - when the user is logged in show the 'View Notes' screen ✅
  - https://reactnavigation.org/docs/auth-flow/
- Update data model (and fetching) so each user can only see their own notes ✅
- 🐞 user state error when logging out ✅
- 🐞 "No Notes" flashes before your notes are shown ✅
- Add Loader instead of "Loading" text ✅
- all the error handling ✅
  - errors working on ForgotPassword screen, but not on Login screen
  - Login
  - Sign Up
- refactor/clean up -- remove unused helper functions or refactor to use them ✅
  - use absolute paths everywhere
  - clean up styling
- Update design - pick color palette and use RN paper with theme ✅
- convert to be a list of gear rather than a list of notes ✅
  - change app name, variables, components
- add translation ✅
- refactor firebase config ✅
- convert to TS ✅
- use new firebase project (does new app have new config variables? or does it need to be an entirely new project?) to make sure that config isn't accidentally pushed (previous commits might not have had the file in .gitignore) ✅
- add gear details page to show more information on each item ✅
- finish up TS conversion ✅
- update lint and husky to run ts and tsx file ✅
- if you have no gear on load -- don't show add item, or show message that says it's referring you to the add item screen because you don't have any items ✅
- add ability delete items ✅ 
- list should reload after editing or deleting ✅
- sort list aphabetically by itemName ✅
- add ability to edit items ✅

### Active Tasks (Before Firebase --> AsyncStorage)
- add drawer nav side menu - Gear List, Backpacks, Login/Logout
- use header button to operate toggle drawer
- Add use react navigation header with nav theme (pull logout from custom header)

- add more fields for gear details
  - company, color, size, weight, description, quantity, model
- add "Create a backpack" feature
- add drag down to refresh
- UI updates

- remove unused libraries: axios
- push to github
- update README/write up how-to

#### Next Features:
- add feature to include photo in gear details
- add feature to scan barcodes and add gear details from there
- add feature to track hikes with ability to tag location
- Persist user as logged in after app is closed - https://docs.expo.io/versions/latest/sdk/securestore/

App Development:
- publish app
- add dotenv to manage environment variables (react-native-dotenv)
- Add graphQL
