function Slides() {
    var slidesId = '.slides';
    var currentSlide = $(slidesId + ' > section').first();

    function changeSlidesId(id) {
        if(id === undefined)
            return;

        slidesId = id;
        currentSlide = $(slidesId + ' > section').first();
    }

    function scrollTop() {
        $('html, body').scrollTop(0);
    }

    function createSlideAnchors(id, prefix)
    {
        changeSlidesId(id);

        $(((id !== undefined) ? id : slidesId) + ' > section').attr('id', function(i, a) {
            return ((prefix !== undefined) ? prefix : 'slide-') + (i+1);
        });
    }

    function showCurrentSlide(previousSlide) {

        var currentSlideClass = currentSlide.attr('class');

        if(currentSlideClass !== undefined) {
            var animationDurationCurrentSlide = 0;
            var animationDurationPreviousSlide = 0;

            currentSlideClass.split(' ').forEach(function(e) {
                if(e.match('effect-') === null)
                    return;

                currentSlide.show();
                currentSlide.addClass(e + '-enable');

                var animationDuration = currentSlide.css('animation-duration');
                var newDuration = +animationDuration.substr(0,animationDuration.length-1) * 1000;

                if(newDuration > animationDurationCurrentSlide)
                    animationDurationCurrentSlide = newDuration;

                if(previousSlide !== undefined) {
                    previousSlide.show();
                    previousSlide.addClass(e + '-previous')

                    animationDuration = previousSlide.css('animation-duration');
                    newDuration = +animationDuration.substr(0,animationDuration.length-1) * 1000;

                    if(newDuration > animationDurationPreviousSlide)
                        animationDurationPreviousSlide = newDuration;
                }
            });

            if((animationDurationCurrentSlide > 0) || (animationDurationPreviousSlide > 0)) {
                setTimeout(function() {
                    previousSlide.hide();

                    var previousSlideClass = previousSlide.attr('class');

                    previousSlideClass.split(' ').forEach(function(e) {
                        if(e.match('-previous'))
                            previousSlide.removeClass(e);
                    });

                }, animationDurationPreviousSlide);

                setTimeout(function() {
                    var currentSlideClass = currentSlide.attr('class');

                    currentSlideClass.split(' ').forEach(function(e) {
                        if(e.match('-enable'))
                            currentSlide.removeClass(e);
                    });

                }, animationDurationCurrentSlide);
            }
        }

        currentSlide.show();
        scrollTop();
        updateProgress();
    }

    function nextSlide() {
        var previousSlide = currentSlide;
        var nextSlide = currentSlide.next('section');
        
        if(nextSlide.length === 0)
            return;

        currentSlide = nextSlide;

        $(slidesId + ' > section').hide();

        showCurrentSlide(previousSlide);
    }

    function previousSlide() {
        var nextSlide = currentSlide;
        var previousSlide = currentSlide.prev('section');
        
        if(previousSlide.length === 0)
            return;

        currentSlide = previousSlide;

        $(slidesId + ' > section').hide();

        showCurrentSlide(nextSlide);
    }

    function toSlide(id) {
        var previousSlide = currentSlide;
        currentSlide = $(id);

        $(slidesId + ' > section').hide();

        showCurrentSlide(previousSlide);
    }

    function start() {
        $(slidesId + ' > section').hide();
        showCurrentSlide();
    }

    function handleKeyEvents() {
        $(document).keyup(function(event) {
            switch(event.keyCode) {
                // up and down breaks scrolling
                //case 38: // up
                case 37: previousSlide(); break; // left
                //case 40: // down
                case 39: nextSlide(); break; // right
            }
        });
    }

    function updateProgress() {
        $('.progress > div').css('width', (progress() * 100 )+ '%');
    }

    function createMobileNavigation()
    {
        $('body').click(function(event) {
            nextSlide();
        });

        $(slidesId + ' > section > h1').click(function(event) {
            previousSlide(); event.stopPropagation();
        });
    }

    function currentSlideNumber() {
        return currentSlide.prevAll('section').length;
    }

    function slideCount() {
        return $(slidesId + ' > section').length;
    }

    function progress() {
        return (currentSlideNumber() + 1) / slideCount();
    }

    function showProgress() {
        if($('body > .progress').length === 0)
                $('body').prepend('<div class="progress"></div>');
    
        if($('.progress > div').length === 0)
            $('.progress').append(document.createElement('div'));

        updateProgress();
    }

    function hideProgress() {
        $(slidesId + ' > section > .progress').remove();
    }
    

// public

    this.createSlideAnchors = createSlideAnchors;
    this.nextSlide = nextSlide;
    this.previousSlide = previousSlide;
    this.toSlide = toSlide;
    this.start = start;
    this.handleKeyEvents = handleKeyEvents;
    this.updateProgress = updateProgress;
    this.createMobileNavigation = createMobileNavigation;
    this.progress = progress;
    this.currentSlideNumber = currentSlideNumber;
    this.slideCount = slideCount;
    this.showProgress = showProgress;
    this.hideProgress = hideProgress;
}