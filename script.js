let form = document.querySelector("form")
let username = document.querySelector("#name")
let role = document.querySelector("#role")
let bio = document.querySelector("#bio")
let photo = document.querySelector("#photo")


let userManager = {
    users : [],


    init : function(){
        form.addEventListener("submit" , this.submitForm.bind(this))
    },

    submitForm: function(e){
        e.preventDefault();
        this.addUser();

    },
    addUser: function(){

      const newUser = {
            username: username.value,
             id: Date.now().toString(36) + Math.random().toString(36).slice(2),
            bio: bio.value,
            role: role.value,
            pic:photo.value
      }

        this.users.push(newUser)
        form.reset()
        this.renderUi()
    },
    RemoveUserById: function(id){
      const idx = this.users.findIndex((u) => {
        return u.id === id
      })
      if(idx !== -1){
        this.users.splice(idx ,1)
        this.renderUi()
      }

    },
     renderUi: function () {
    document.querySelector(".users").innerHTML = "";
    this.users.forEach(function (user) {
      const card = document.createElement("div");
      card.className =
        "bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8   flex flex-col items-center border border-blue-100 hover:scale-105 transition";
        card.dataset.id = user.id

      // Image
      const img = document.createElement("img");
      img.className =
        "w-28 h-28 rounded-full object-cover mb-5 border-4 border-blue-200 shadow";
      img.src = user.pic;
      img.alt = "User Photo";
      card.appendChild(img);

      // Name
      const name = document.createElement("h2");
      name.className = "text-2xl font-bold mb-1 text-blue-700";
      name.textContent = user.username;
      card.appendChild(name);

      // Role
      const role = document.createElement("p");
      role.className = "text-purple-500 mb-2 font-medium";
      role.textContent = user.role;
      card.appendChild(role);

      // Description
      const desc = document.createElement("p");
      desc.className = "text-gray-700 text-center";
      desc.textContent = user.bio;
      card.appendChild(desc);


      //Deleting Card
      card.addEventListener("dblclick" , function(){
        if(confirm(`${user.username}`)){
          userManager.RemoveUserById(user.id);
        }
      })

      // Finally, append the card wherever needed, for example:

      document.querySelector(".users").appendChild(card);
    });
  },





}
userManager.init(); 