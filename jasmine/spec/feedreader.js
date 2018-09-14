//references
//https://stackoverflow.com/questions/22413009/jasmine-javascript-testing-tobe-vs-toequal
//https://www.youtube.com/watch?v=yW3WyUThC9E
//https://www.youtube.com/watch?v=h2eWfvcAOTI&feature=youtu.be

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('make sure that all URL in the feed are defined',function(){
             allFeeds.forEach(element => {
                 //console.log(element)
                 expect(element.url).toBeDefined();
                 expect(element.url.length).not.toBe(0);
             });
        })


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('make sure that URL is not an empty string',function(){
             allFeeds.forEach(element => {
                 expect(element.name.length).not.toBe(0);
                 expect(element.name).toBeDefined();
             })
         })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu",function(){

     
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('check to see if the menu is hidden when the page intially loads',function(){
            const menu = $('body');
            expect(menu.hasClass('menu-hidden')).toBeTruthy();
        })

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('check to see if the menu toggles when the hamburger icon is clicked',function(){

            //grab the menu icon
             const menuIcon = $('.menu-icon-link');
            
             //initially body should have class menu-hidden

             //when the menu icon is clicked the menu-hidden class should dissappear
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBeFalsy();
             console.log('clicked, the menu is showing');

             //when the menu icon is clicked again the menu-hidden class should reappear
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBeTruthy();
             console.log('clicked, the menu is not showing anymore!')

         })
        })

        describe('Initial Entries',function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        let feed;

        //done signals that the function has completed loading

        //beforeEach test within the testing framework in not within the application
        beforeEach(function(done) {
          //at least one single entry is loaded
          //call loadFeed(id)
          //holds an object
          feed = loadFeed(0,done);
        });

        it('feeder is completely loaded',function(done){
           
            //check to see if the feed container is loaded
            expect($('.feed .entry').length > 0).toBeGreaterThan(0);
            done();
        })
        
    })

        describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        
         let firstFeed;

         beforeEach(function (done){
             //load the first feed in the callback store it
            firstFeed = loadFeed(0,function(){
            
                firstFeed = $('.feed').html();

                //load the second feed and stop the loding process
                loadFeed(1)
                loadFeed(1,done);
            })
         })

         it('check to see if a new feed has been created',function(done){
             //the second feed is available store its html
             let secondFeed = $('.feed').html();
             //console.log(firstFeed);
             //console.log(secondFeed);

             expect(secondFeed).not.toEqual(firstFeed);
            done();

         })
   
    })
    
}());
