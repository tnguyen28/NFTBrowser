# NFT BROWSER

-added script to "npm start", will run local cors proxy

# TODO
- Many things that can stil be done to improve the overall performance of rendering large data.
    - things like
     - lazy loading components
     - loading more data at one time, then querying more at a certain points
        - i.e. loading 5 pages at once, then on the 4th page load some more, etc...
     - load handling, spinners etc
     - redux is very powerful, learning process to really dive deep and take advantage while also maintaining decent typescript practices
     - react router, to query pages/loading 
     - Search by name feature only searches on current loaded page, all the more reason to migrate
# KNOWN BUGS
- Pagination steps state change/redux interferring with each other
    - potential fix:
        - migrate page handling to redux