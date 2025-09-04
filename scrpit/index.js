const createElements = (arr)=> {

const htmlElements = arr.map((el)=> `<span class="btn">${el}</span>`);

return(htmlElements.join(" "));

};

const manageSpinner = (status) => {

    if(status == true){
        document.getElementById('loading-future').classList.remove("hidden")
        document.getElementById('word-container').classList.add("hidden")


    }else{
        document.getElementById('word-container').classList.remove("hidden")
        document.getElementById('loading-future').classList.add("hidden")

        
    }

};



const loadLessons = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data))

};

const removeActive = () => {

    const lessonButtons = document.querySelectorAll(".lesson-btn")

    lessonButtons.forEach(btn => btn.classList.remove("active"));







};



const loadWord = (id) => {

    manageSpinner(true);


    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then(res => res.json())
        .then((data) => {

            removeActive();

            const clickBtn = document.getElementById(`lesson-btn-${id}`)

            clickBtn.classList.add('active');



            displayLevelWord(data.data)


        });

}


window.loadWord = loadWord;




const loadWordD = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    
    const details = await res.json();

    displayWordDetail(details.data)
    

   
};

window.loadWordD = loadWordD;



const displayWordDetail=(word)=>{

    console.log(word)

    const detailsBox = document.getElementById('details-container')

    detailsBox.innerHTML = `<div class="">
            <h2 class="text-2xl font-bold">
            ${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div class="">
            <h2 class="text-xl font-bold">Meaning</h2>
            <p>${word.meaning}</p>
            
        </div>
        <div class="">
            <h2 class="text-xl font-bold">Example</h2>
            <p>${word.sentence}</p>

        </div>
        <div class="">
            <h2 class="text-xl font-bold">Synonym</h2>
           
        </div>
        <div class="">
            ${createElements(word.synonyms)}
           
        </div>
        
        
        
        `;

    document.getElementById('word_modal').showModal();

    
}







const displayLevelWord = (words) => {

    const WordContainer = document.getElementById('word-container');

    WordContainer.innerHTML = "";

    if (words.length == 0) {
        WordContainer.innerHTML = `


        

        <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla ">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
        
        <p class="text-xl font-medium text-gray-400">
               এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="text-5xl font-bold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
        </div>
        
        
        `;
        manageSpinner(false);
        return;
    }



    // // {
    //     "id": 76,
    //     "level": 1,
    //     "word": "Fast",
    //     "meaning": "দ্রুত",
    //     "pronunciation": "ফাস্ট"
    // }






    words.forEach(word => {


        const card = document.createElement('div');

        card.innerHTML = `

        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">

            <h2 class="text-2xl  font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl font-medium ">
            "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} /
             ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>

            <div class="flex justify-between items-center">

                <button onclick="loadWordD('${word.id}')" 
                class="btn bg-[#1A91FF30] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF30] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i></i></button>


            </div>


        </div>
        
        
        `;


        WordContainer.append(card)
    });

    manageSpinner(false);

}


const displayLesson = (lessons) => {
    // 1.get the  contanier & empty

    const leveContainer = document.getElementById('level-container')
    leveContainer.innerHTML = "";


    // 2. get into evey lesson

    for (let lesson of lessons) {


        // 3. create Element

        const btndiv = document.createElement("div")
        btndiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" 
    class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}
    </button>
    `;
        // 4. append into container

        leveContainer.append(btndiv)


    }







}

loadLessons()