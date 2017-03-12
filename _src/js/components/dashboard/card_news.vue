<template>
    
   <div class="card card--news card--primary">
        <div class="card__overlay">
            <div class="card__header">
                <div class="card__header-left">
                    <span>News</span>
                </div>
                <div class="card__header-right">
                    <div class="card__control card__control--left" data-slickPrev="true"><i class="icon icon--chev-left"></i></div>
                    <div class="card__control card__control--right" data-slickNext="true"><i class="icon icon--chev-right"></i></div>
                </div>
            </div>
            <div class="card__slider" data-slick="true">
                <div>
                    <div class="card__info">
                        <span class="card__title">Phasellus fermentum in, dolor. Bassel fermentum lorem Ipsum dolor. Ferentium Artotel in, dolor.</span>
                        <span class="card__date">Jan 9, 2015</span>
                        <span class="card__author">Added by Konrad Keck</span>
                    </div>
                    <div class="card__content">
                        <span>Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna...</span>
                    </div>
                    <div class="card__footer">
                        <button class="btn-link btn--md btn--primary mdl-button mdl-js-button mdl-js-ripple-effect">READ MORE</button>
                    </div>
                </div>
                <div>
                    <div class="card__info">
                        <span class="card__title">Lorem Epsum Doloris Malis. </span>
                        <span class="card__date">Dec 10, 2015</span>
                        <span class="card__author">Added by Łukasz Cirut</span>
                    </div>
                    <div class="card__content">
                        <span> Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna aloret! Maecenas malesuada, ut molestie a. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula.</span>
                    </div>
                    <div class="card__footer">
                        <a href="#" class="btn-link btn--md btn--primary mdl-button mdl-js-button mdl-js-ripple-effect">READ MORE</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  
export default {

    name: 'Chart-News',
    data: function() {
        return {
            
        }
    },
    mounted: function() {

       

    },
    methods: {


    }
    
};  

</script>

