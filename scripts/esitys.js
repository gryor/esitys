function Slides(useDefaults) {
    var slidesId = '.slides';
    var currentSlide = $(slidesId + ' > section').first();
    var fontMaxSize = true;
    var minimumFontSize = 10;
    var maximumFontSize = 48;

    if((useDefaults === true) || (useDefaults === undefined)) {
        showProgress();
        handleKeyEvents();
        createMobileNavigation();
        start();
    }

    function changeSlidesId(id) {
        if(id === undefined)
            return;

        slidesId = id;
        currentSlide = $(slidesId + ' > section').first();
    }

    function scrollTop() {
        $('html, body').scrollTop(0);
    }

    function createSlideAnchors(id, prefix) {
        changeSlidesId(id);

        $(((id !== undefined) ? id : slidesId) + ' > section').attr('id', function(i, a) {
            return ((prefix !== undefined) ? prefix : 'slide-') + (i+1);
        });
    }

    function showCurrentSlide() {
        currentSlide.show();
        updateProgress();
        
        if(fontMaxSize)
            maxFontSize();
        else
            fixOverflow();

        scrollTop();
    }

    function nextSlide() {
        var nextSlide = currentSlide.next('section');
        
        if(nextSlide.length === 0)
            return;

        currentSlide = nextSlide;

        $(slidesId + ' > section').hide();

        showCurrentSlide();
    }

    function previousSlide() {
        var previousSlide = currentSlide.prev('section');
        
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

        $(window).resize(function() {
            if(fontMaxSize)
                maxFontSize();
            else
                fixOverflow();
        });
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

    function overflowingHeight() {
        return $(document).height() > $(window).height();
    }

    function overflowingWidth() {
        return $(document).width() > $(window).width();
    }

    function overflowing() {
        return overflowingHeight() || overflowingWidth();
    }

    function resetOriginalFontSize() {
        if(currentSlide.attr('data-font-size-original') === undefined)
            currentSlide.attr('data-font-size-original', currentSlide.css('font-size'));
        else
            currentSlide.css('font-size', currentSlide.attr('data-font-size-original'));
    }

    function fixOverflow() {
        resetOriginalFontSize();

        var originalFontSizeString = currentSlide.css('font-size');

        var fontSizeString = originalFontSizeString;
        var fontSize = fontSizeString.substr(0, fontSizeString.length-2);

        while(overflowing())
        {
            fontSize = fontSize - 0.5;

            if(fontSize <= 0)
                break;

            currentSlide.css('font-size', fontSize + 'px');
        }

        if(fontSize < minimumFontSize)
            currentSlide.css('font-size', minimumFontSize + 'px');
    }

    function maxFontSize() {
        resetOriginalFontSize();

        var originalFontSizeString = currentSlide.css('font-size');

        var fontSizeString = originalFontSizeString;
        var fontSize = fontSizeString.substr(0, fontSizeString.length-2);

        while(overflowing() === false) {
            fontSize = fontSize * 2;

            if(maximumFontSize !== undefined)
                if(fontSize >= maximumFontSize) {
                    fontSize = maximumFontSize;
                    currentSlide.css('font-size', fontSize + 'px');
                    break;
                }

            currentSlide.css('font-size', fontSize + 'px');
        }

        while(overflowing())
        {
            fontSize = fontSize - 10;

            if(fontSize <= 0)
                break;
            
            currentSlide.css('font-size', fontSize + 'px');
        }

        fontSize = fontSize + 10;
        currentSlide.css('font-size', fontSize + 'px');

        while(overflowing())
        {
            fontSize = fontSize - 1;

            if(fontSize <= 0)
                break;
            
            currentSlide.css('font-size', fontSize + 'px');
        }

        fontSize = fontSize + 1;
        currentSlide.css('font-size', fontSize + 'px');

        while(overflowing())
        {
            fontSize = fontSize - 0.5;

            if(fontSize <= 0)
                break;

            currentSlide.css('font-size', fontSize + 'px');
        }

        if(maximumFontSize !== undefined)
            if(fontSize > maximumFontSize)
                    currentSlide.css('font-size', maximumFontSize + 'px');
        
        if(minimumFontSize !== undefined)
            if(fontSize < minimumFontSize)
                currentSlide.css('font-size', minimumFontSize + 'px');
    }
    

// public

    this.createSlideAnchors = createSlideAnchors;
    this.nextSlide = nextSlide;
    this.previousSlide = previousSlide;
    this.currentSlide = currentSlide;
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
    this.overflowingHeight = overflowingHeight;
    this.overflowingWidth = overflowingWidth;
    this.overflowing = overflowing;

    this.__defineGetter__('maximumFontSize', function() {
        return maximumFontSize;
    });
    this.__defineSetter__('maximumFontSize', function(value) {
        maximumFontSize = value;
        
        if(fontMaxSize)
            maxFontSize();
        else
            fixOverflow();
    });

    this.__defineGetter__('minimumFontSize', function() {
        return minimumFontSize;
    });
    this.__defineSetter__('minimumFontSize', function(value) {
        minimumFontSize = value;
        
        if(fontMaxSize)
            maxFontSize();
        else
            fixOverflow();
    });

    this.__defineGetter__('fontMaxSize', function() {
        return fontMaxSize;
    });
    this.__defineSetter__('fontMaxSize', function(value) {
        fontMaxSize = value;

        if(fontMaxSize)
            maxFontSize();
        else
            fixOverflow();
    });
}