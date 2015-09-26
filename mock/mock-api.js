(function ($) {
    'use strict';
    var comeOn  = {
        players: {
            rebecka: {
                name: 'Rebecka Awesome',
                avatar: 'images/avatar/rebecka.jpg',
                event: 'Last seen gambling on Starburst.',
                password: 'secret'
            },
            eric: {
                name: 'Eric Beard',
                avatar: 'images/avatar/eric.jpg',
                event: 'I saw you won 500 SEK last time!',
                password: 'dad'

            },
            stoffe: {
                name: 'Stoffe Rocker',
                avatar: 'images/avatar/stoffe.jpg',
                event: 'Your are a rock star',
                password: 'rock'
            }
        },
        games : [
            {
                name: 'Starburst',
                description: 'Starburst is a high paced slot with some nice new features including a Starburst Wild feature. It has 5-reels and 10-bet lines and Traditional Wilds are replaced with an innovative new Starburst Wild which appear on reels 2, 3 or 4 and expand over the entire reel and remain in place for up to 3 re-spins giving you a much better chance of hitting a HUGE win!',
                code: 'starburst',
                icon: 'images/game-icon/starburst.jpg',
                categoryIds: [0, 2]
            },
            {
                name: 'Jack Hammer',
                description: 'Jack Hammer is a 25-line, 3-row video slot using 15 independent reels set in the gritty, glamorous underworld of a crime fighting private eye.The game features Sticky Wins, Free Spins and Wild Substitutions.',
                code: 'jackhammer',
                icon: 'images/game-icon/jackhammer.jpg',
                categoryIds: [0, 1]
            },
            {
                name: 'Jack and the Beanstalk',
                description: 'We is proud to present Jack and the Beanstalk. This game has a new feature called walking wilds which you will find in the main gameplay of this amazing game When a wild symbol is placed on the reels it will travel one reel at a time unti it leaves the left most reel, hence the name walking wilds! There are also in game free spins, where the main feature is to collect keys to unlock the different wild functionalities.',
                code: 'jackandbeanstalk',
                icon: 'images/game-icon/jackandbeanstalk.jpg',
                categoryIds: [0, 2, 1]
            },
            {
                name: 'Dead or Alive',
                description: 'The Elements slot has an Avalanche meter which increases by one for each successive fall until it reaches the maximum of 4. After 4 successive Avalanches one of the 4 Free Falls Storm modes is triggered. These are the Fire Storm mode, Air Storm mode, Earth Storm mode, and Water Storm mode. The colours of the Avalanche meter match the leading element in the current game round.',
                code: 'deadoralive',
                icon: 'images/game-icon/deadoralive.jpg',
                categoryIds: [0, 2]
            },
            {
                name: 'Twin Spin',
                description: 'The Twin Spin video slot has a Las Vegas theme brought into the 21st Century! Each spin starts with identical, adjacent twin reels that are linked together. During the spin the twin reels can expand to become triplet, quadruplet or even quintuplet reels. The unique reel synchronising and linking feature that appears on every single spin and the 243 ways to win makes for massive payouts!',
                code: 'twinspin',
                icon: 'images/game-icon/twinspin.jpg',
                categoryIds: [0, 1]
            }

        ],
        categories : [
            {
                id: 0,
                name: 'ALL'
            },
            {
                id: 1,
                name: 'VIDEO SLOTS'
            },
            {
                id: 2,
                name: 'SLOT MACHINES'
            }
        ], 
        extractCategories: function(itemS){
            for(var i = 0; i < itemS.length; i++){
                 var e = itemS.join(' ');
                return e;
            }
        }
    };

    $.mockjax({
        url: '/login',
        contentType: 'application/json',
        response: function (settings) {
            var username = settings.data.username,
                password = settings.data.password;

            if (username in comeOn.players && comeOn.players[username].password === password) {
                this.responseText = {
                    status: 'success',
                    player: comeOn.players[username]
                }
            } else {
                this.responseText = {
                    status: 'fail',
                    error: 'player does not exist or wrong password'
                }
            }
        }
    });


    $.mockjax({
        url: '/games',
        contentType: 'application/json',
        responseText: comeOn.games
    });

    $.mockjax({
        url: '/categories',
        contentType: 'application/json',
        responseText: comeOn.categories    
    });

                      
    $.mockjax({
        url: '/logout',
        contentType: 'application/json',
        response: function (settings) {
            var username = settings.data.username;          
            if (username in comeOn.players) {
                this.responseText = {
                    status: 'success'  
                }
            } else {
                this.responseText = {
                    status: 'fail',
                    error: 'Username do not match!'
                }
            }
        }
    });


    $(document).ready(function() {
        ko.applyBindings(comeOn);

        var $rows = $('.0');
      // After validating an User//

        if(localStorage.playerName !== undefined){
            readUser();      
        }

        function readUser() {
            $('.avatar').attr('src', localStorage.getItem("playerAvatar"));
            $('.player .content .name').append(localStorage.getItem("playerName"));
            $('.event').append(localStorage.getItem("playerEvent"));
            $('.login').css('display', 'none');
            $('.casino').css('display', 'block'); 
        }

        // Log In function//
        
        $('form').submit(function(e){
            e.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            $.ajax({
                url: '/login',
                type : 'POST',
                data: {
                    username: username,
                    password: password
                },
                success: function(data){
                    if (data.status === 'success'){
                        localStorage.setItem("playerAvatar", data.player.avatar);
                        localStorage.setItem("playerName", data.player.name);
                        localStorage.setItem("playerEvent", data.player.event);
                        readUser();
                    }           
                }
            });
        });

        // Log Out function//

        $('.logout').click(function(e){
            e.preventDefault();
            $.ajax({
                url: '/logout',
                type : 'POST',
                data: {
                    username: localStorage.getItem('playerName')
                }, success: function(){
                    localStorage.clear();
                    window.location.reload();
                }
            });
        });

        // Function to search a Game//
        
        $('#search').keyup(function() {
            function rowFilter(item) {//$container.isotope({ filter: '*'});
                var val = '^(?=.*\\b' + $.trim($('#search').val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
                    reg = RegExp(val, 'i'),
                    text;

                item.show().filter(function() {
                    text = $(this).text().replace(/\s+/g, ' ');
                    return !reg.test(text);
                }).hide();
            }

            var $container = $('#container').isotope({});

            for (var i = 0; i < comeOn.categories.length; i++){
                if($('#' + i).hasClass('active')){
                    $rows = $('.' + i);
                    var id = '.' + i;
                    rowFilter($rows);
                    $container.isotope({ filter: id });
                } 
            }

        });

        // Function to filter by Category//

        $('.category .item').click(function(e){
                    e.preventDefault();
                    var categoryId = '.' + $(this).attr('id');
                    var $container = $('#container').isotope({});
                    $container.isotope({ filter: categoryId });
                    $('.category .item').removeClass('active');
                    $(this).addClass('active');
        });  

        $('#0').addClass('active');

        // Function to play the selected Game//

        $('.game .play').click(function(e){
                    e.preventDefault();
                    $('.ingame').css('display', 'block');
                    $('.casino').css('display', 'none');
                    var code = $(this).attr('id');
                    comeon.game.launch(code);
        }); 

        // Function to go back from Gameplay//

        $('.ingame .button').click(function(e){
                    e.preventDefault();
                    $('.casino').css('display', 'block');
                    $('.ingame').css('display', 'none');
        }); 

        $('.group').click(function(e){
                    e.preventDefault();
                    $('.game .description').css('display', 'none');
                    $('.game .play').css('display', 'none');
                    $('.game .item').addClass('groupView');
                    $('#container').prop('class', 'relaxed divided game items links');
                    $('.game .item').prop('style', 'color: #000000;');
                   // $('.game').css('min-width','30%');
                    //$('.item:first-child').css('padding-top','');

        }); 

        $('.detail').click(function(e){
                    e.preventDefault();  
                    $('.game .item').removeClass('groupView');
                    $('#container').prop('class', 'ui relaxed divided game items links');
                    $('.game .item').prop('style', 'color: #000000;');
                    
                    $('.game .description').css('display', 'block');
                    $('.game .play').css('display', 'block');      
                    



                    //window.location.reload();

                    //$('.game').css('min-width','100%');
        }); 


    });

})(jQuery);
