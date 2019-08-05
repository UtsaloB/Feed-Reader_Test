/* feedreader.js
 *
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // First test suite
    describe('RSS Feeds', function() {
        /* First test
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('feed urls are defined', function (){
            for (var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

         it('feed names defined', function (){
             for (var i=0; i<allFeeds.length; i++){
                 expect(allFeeds[i].name).toBeDefined();
                 expect(allFeeds[i].name.length).not.toBe(0);
             }
         })
    });

    describe('The Menu', function(){       
        it('menu hidden by default', function(){
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });    

        it('visibility changed', function(){
            document.querySelector('a.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            document.querySelector('a.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    })

    describe('Initial Entries', function(){
        beforeEach(function(done){
            loadFeed(1, done);
        });
        it('there is at least a single entry', function(){
            expect($('.feed').has('.entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function(){
        let firstEntry, secondEntry;
       
        //     $('.feed'),empty();
         beforeEach(function(done){
            loadFeed(0, function(){
                //         firstEntry = $('.feed').find(allFeeds.url);
                //         done();
                firstEntry = document.querySelector('div.feed').innerHTML;
                loadFeed(1, function(){
                    secondEntry = document.querySelector('div.feed').innerHTML;
                    done();
                })
            })
        })
        it('new feed content loaded', function(){
            expect(firstEntry).not.toBe(secondEntry);
        });
    });

}());
