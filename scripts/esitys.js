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

    function showCurrentSlide() {
        currentSlide.show();
        scrollTop();
        updateProgress();
    }

    function nextSlide() {
        var nextSlide = $(currentSlide).next('section');
        
        if(nextSlide.length === 0)
            return;

        currentSlide = nextSlide;

        $(slidesId + ' > section').hide();

        showCurrentSlide();
    }

    function previousSlide() {
        var previousSlide = $(currentSlide).prev('section');
        
        if(previousSlide.length === 0)
            return;

        currentSlide = previousSlide;

        $(slidesId + ' > section').hide();

        showCurrentSlide();
    }

    function toSlide(id) {
        currentSlide = $(id);

        $(slidesId + ' > section').hide();

        showCurrentSlide();
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
        if($(slidesId + ' > section > .progress').length === 0)
                $(slidesId + ' > section').prepend('<div class="progress"></div>');
    
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