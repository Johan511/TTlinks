batch_form ={}
batch_form.AnnouncementForm = {}
batch_form.MessageForm = {}
batch_form.Batch = window.location.href.split('/')[4]


batch_form.AnnouncementForm.AnnouncementHeading = document.querySelector('#announcement-message-form-heading')
batch_form.AnnouncementForm.AnnouncementDTE = document.querySelector('#announcement-message-form-dte')
batch_form.AnnouncementForm.AnnouncementContent = document.querySelector('#announcement-message-form-content')
batch_form.AnnouncementForm.AnnouncementSubmit = document.querySelector('#announcement-message-form-submit')



batch_form.MessageForm.MessageHeading = document.querySelector('#message-message-form-heading')
batch_form.MessageForm.MessageDTE = document.querySelector('#message-message-form-dte')
batch_form.MessageForm.MessageContent = document.querySelector('#message-message-form-content')
batch_form.MessageForm.MessageSubmit = document.querySelector('#message-message-form-submit')

batch_form.AnnouncementForm.AnnouncementSubmit.addEventListener('click', function(e){
    e.preventDefault()
    var announcement = {
        batchName: batch_form.Batch,
        isAnnouncement: true,
        heading: batch_form.AnnouncementForm.AnnouncementHeading.value,
        expireAt: batch_form.AnnouncementForm.AnnouncementDTE.value,
        content: batch_form.AnnouncementForm.AnnouncementContent.value
    }
    batch_form.AnnouncementForm.AnnouncementHeading.value = ''
    batch_form.AnnouncementForm.AnnouncementDTE.value = ''
    batch_form.AnnouncementForm.AnnouncementContent.value = ''
    console.log(announcement)
    batch_form.AnnouncementForm.AnnouncementSubmit.disabled = true
    batch_form.AnnouncementForm.AnnouncementSubmit.innerHTML = 'Sending...'
    fetch(`/batch/${batch_form.Batch}/addMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(announcement)
    }).then(function(response){
        if(response.ok){
            batch_form.AnnouncementForm.AnnouncementSubmit.innerHTML = 'Sent!'
            batch_form.AnnouncementForm.AnnouncementSubmit.disabled = false
            setTimeout(function(){
                batch_form.AnnouncementForm.AnnouncementSubmit.innerHTML = 'Send'
            }, 3000)
        }else{
            batch_form.AnnouncementForm.AnnouncementSubmit.innerHTML = 'Error'
            batch_form.AnnouncementForm.AnnouncementSubmit.disabled = false
            setTimeout(function(){
                batch_form.AnnouncementForm.AnnouncementSubmit.innerHTML = 'Send'
            }, 3000)
        }
    })
})


batch_form.MessageForm.MessageSubmit.addEventListener('click', function(e){
    e.preventDefault()
    var message = {
        batchName: batch_form.Batch,
        isAnnouncement: false,
        heading: batch_form.MessageForm.MessageHeading.value,
        expireAt: batch_form.MessageForm.MessageDTE.value,
        content: batch_form.MessageForm.MessageContent.value
    }
    batch_form.MessageForm.MessageHeading.value = ''
    batch_form.MessageForm.MessageDTE.value = ''
    batch_form.MessageForm.MessageContent.value = ''
    console.log(message)
    batch_form.MessageForm.MessageSubmit.disabled = true
    batch_form.MessageForm.MessageSubmit.innerHTML = 'Sending...'
    
    fetch(`/batch/${batch_form.Batch}/addMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }).then(function(response){
        if(response.ok){
            batch_form.MessageForm.MessageSubmit.innerHTML = 'Sent!'
            batch_form.MessageForm.MessageSubmit.disabled = false
            setTimeout(function(){
                batch_form.MessageForm.MessageSubmit.innerHTML = 'Send'
            }, 3000)
        }else{
            batch_form.MessageForm.MessageSubmit.innerHTML = 'Error'
            batch_form.MessageForm.MessageSubmit.disabled = false
            setTimeout(function(){
                batch_form.MessageForm.MessageSubmit.innerHTML = 'Send'
            }, 3000)
        }
    })
})



