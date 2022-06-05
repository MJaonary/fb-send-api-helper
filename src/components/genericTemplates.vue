<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>

<template>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-interval="false" style="width: 100%;">
        <div class="carousel-inner">
            <div class="carousel-item border rounded active">
                <div>
                    <div class="image-container" style="position: relative;">
                        <img src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp" class="d-block w-100"
                            alt="Exotic Fruits" />
                        <input type="text" class="text-center centered templates-input" placeholder="Paste Url Here">
                    </div>
                    <div class="buttons">
                        <input type="text" class="text-center templates-input" placeholder="Title">
                    </div>
                    <div class="buttons">
                        <input type="text" class="text-center templates-input" placeholder="Subtitle">
                    </div>
                    <div class="buttons"><i class="fa-solid fa-plus"></i> add default action</div>
                    <div class="buttons"><i class="fa-solid fa-plus"></i> add button</div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        <div class="quick-reply-container" contenteditable>
            <div class="quick-reply-button"><i class="fa-solid fa-plus"></i> Quick Reply</div>
        </div>
        <div class="mt-1 bg-danger text-white rounded text-center">Delete Template</div>
    </div>
</template>

<style>
</style>