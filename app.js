document.addEventListener("DOMContentLoaded", function() {
  var activityForm = document.getElementById("activityForm");
  var activityNameInput = document.getElementById("activityName");
  var activityTimeInput = document.getElementById("activityTime");
  var activityList = document.getElementById("activityList");

  activityForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var activityName = activityNameInput.value.trim();
    var activityTime = new Date(activityTimeInput.value).getTime();

    if (activityName !== "") {
      var activity = {
        name: activityName,
        time: activityTime
      };

      var activities = getActivitiesFromLocalStorage();
      activities.push(activity);
      saveActivitiesToLocalStorage(activities);
      resetForm();
      displayActivities();
    }
  });

  activityList.addEventListener("click", function(event) {
    if (event.target.classList.contains("update-button")) {
      var index = event.target.dataset.index;
      updateActivityTime(index);
      displayActivities();
    } else if (event.target.classList.contains("delete-button")) {
      var index = event.target.dataset.index;
      deleteActivity(index);
      displayActivities();
    }
  });

  function getActivitiesFromLocalStorage() {
    var activities = localStorage.getItem("activities");
    return activities ? JSON.parse(activities) : [];
  }

  function saveActivitiesToLocalStorage(activities) {
    localStorage.setItem("activities", JSON.stringify(activities));
  }

  function resetForm() {
    activityNameInput.value = "";
    activityTimeInput.value = "";
  }

  function deleteActivity(index) {
    var activities = getActivitiesFromLocalStorage();
    activities.splice(index, 1);
    saveActivitiesToLocalStorage(activities);
  }

  function updateActivityTime(index) {
    var activities = getActivitiesFromLocalStorage();
    activities[index].time = Date.now();
    saveActivitiesToLocalStorage(activities);
  }

  function displayActivities() {
    activityList.innerHTML = "";
    var activities = getActivitiesFromLocalStorage();

    for (var i = 0; i < activities.length; i++) {
      var activity = activities[i];
      var startTime = new Date(activity.time);
      var elapsedTime = formatElapsedTime(Date.now() - startTime);

      var activityItem = document.createElement("div");
      activityItem.classList.add("activity-item");

      var activityName = document.createElement("span");
      activityName.classList.add("activity-name");
      activityName.textContent = activity.name;

      var activityTime = document.createElement("span");
      activityTime.classList.add("activity-time");
      activityTime.textContent = startTime.toLocaleString("ja-JP");

      var elapsedTimeDisplay = document.createElement("span");
      elapsedTimeDisplay.classList.add("  elapsed-time");
      elapsedTimeDisplay.textContent = elapsedTime;

      var updateButton = document.createElement("button");
      updateButton.classList.add("update-button");
      updateButton.dataset.index = i;
      updateButton.textContent = "XV";

      var deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.dataset.index = i;
      deleteButton.textContent = "íœ";

      activityItem.appendChild(activityName);
      activityItem.appendChild(activityTime);
      activityItem.appendChild(elapsedTimeDisplay);
      activityItem.appendChild(updateButton);
      activityItem.appendChild(deleteButton);

      activityList.appendChild(activityItem);
    }

    setTimeout(function() {
      updateElapsedTime();
    }, 1000);
  }

  function updateElapsedTime() {
    var elapsedTimeElements = document.getElementsByClassName("elapsed-time");

    for (var i = 0; i < elapsedTimeElements.length; i++) {
      var activity = getActivitiesFromLocalStorage()[i];
      var startTime = new Date(activity.time);
      var elapsedTime = formatElapsedTime(Date.now() - startTime);
      elapsedTimeElements[i].textContent = elapsedTime;
    }

    setTimeout(function() {
      updateElapsedTime();
    }, 1000);
  }

  function formatElapsedTime(elapsedTime) {
    var seconds = Math.floor(elapsedTime / 1000) % 60;
    var minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    var hours = Math.floor(elapsedTime / 1000 / 60 / 60) % 24;
    var days = Math.floor(elapsedTime / 1000 / 60 / 60 / 24);

    return (
      (days > 0 ? days + "“ú " : "") +
      (hours > 0 ? hours + "ŽžŠÔ " : "") +
      (minutes > 0 ? minutes + "•ª " : "") +
      seconds + "•b"
    );
  }

  displayActivities();
});
