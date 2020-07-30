# SchooListIt (SchooL-List-It)

## Housekeeping
There are currently two branches.
- Master: live on the [demo site](https://app.schoolistit.com/)
- Welcome: working to implement ux improvements to include a proper set up of new users. If I dont get that merged into the demo, it is worth checking out what I have planned. 

# SchoolListIt
## What's due and when for any school, anywhere
### No matter how you school

Since Covid-19, many parents are facing a new and difficult balance of working from home and also schooling from home with fewer childcare options available. A particularly tough, nearly impossible circumstance for single parent homes, the only choice is to reach out farther into the community for support. However, most school information systems do not allow access to extended family and friends - even those that do have a 'big system' user experience that is unfamiliar and confusing to untrained users. 

Meanwhile teachers all across the United States are scrambling to teach in multiple formats with very little time to prepare because of shifting plans and uncertainty. Many schools are still undecided.  

## SchoolListIt is a bulletin board in the town square
### Where anyone can share and everyone can benefit
SchoolListit is the application that pulls it all together in one consistent format no matter how school looks for your family. Think of SchoolListIt as a bulletin board in the town square dedicated to what each class needs to get done each week. 

Any homeschool, public school, private school, or even a karate studio can post the "deliverables" for students. Parents, grandparents, and family friends can help students stay on track. 

- SchoolListIt can push-pull data from any existing system's REST API
- Parents can use SchoolListIt to help each other out
- Even if the api cannot pull data it can quickly be entered and shared
- A tool for creating lessons is included for teachers (video, images, headlines, text, links)
- Assignments can link to another app or within SchoolListIt to a lesson

**It sounds really simple, and maybe that is what makes SchoolListIt special.** SchoolListIt is simple by design. Busy parents only have a few short minutes. In that short amount of time, SchoolListIt is designed to serve exactly the right information and nothing else, programmatically. 

## Usage

### Installation
SchoolListIt is a web application and installs automatically from the web browser onto a your phone (or computer) on the first visit. From there, it can work offline and sync when your connection restores. 

### Set Up
The first time, you are promted to
- designate first language
- choose a role (student, teacher, parent, other helper)
- outline your challenges (time shortage, disabilities, any reading problems, technology)
- identify your students by name, grade
- select your schools

Set up and installation takes around 30s for an average user. There are no limitations, anyone can join and use SchoolListIt. If your school is not on google, just type your schools' name. 

### Following Classes
The first time you open the app, your class feed will show every class from your selected schools and you need to "follow" the right classes for your students. By following a class, you assign it to one of your students or yourself.

That's it. SchoolListIt creates a scheduled checklist of what you need to complete for schoolwork for you and each child in your profile. You can follow classes for yourself, each individual student's, or a global 'household' view. 

The class feed shows every class you follow for every student and  yourself - just 'scroll' through and check what isn't done for today and check off what you've completed.

You can comment on any assignment. This is a great way to get help from a friend or other parent if you're stuck or confused about an assignment. Comments are public like a tweet - it goes out to anyone following that class - and thier comments will show up too. That is really helpful because someone else may have had the same question.



### Closing the education gap

Parental oversight is a known factor to the success of any student, and on the flip side a factor contributing to the the education gap. However, overseeing your children's education in our current system has an opportunity cost far too high for most working mothers and fathers. It is very difficult to gain access to schoolwork and homework deliverables and far more difficult to gain access to the learning material itself. 
#### The system is not designed to facilitate the parental oversight proven to work. SchooListIt is designed to do exactly that!

### Learning is more than just acess to lessons. 
Pacing for elementary students is key. Learning materials, Lesson Plans and clear deliverables are all part of that pacing.  SchooListIt goes beyond the lesson and tackles the lesson plan, deliverables, and learning materials with an open source ethos giving parents real time, instant, and easy access via a smart phone in a social feed format. 

SchooListIt can meet parents where they are and really equip them to oversee and co-educate with teachers.

## Open Source - Open Education
The concept of Open Source in the software world is producing the fruit predicted by thought leaders such as Larry Ellison who famously said, “Once open source gets good enough, competing with it would be insane.” 

Covid-19 is disruptive to the public education system and will make a lasting mark on primary education. Let's make lemonade out of the lemons thrown our way by Covid-19 and Open Source our public education. Teachers can learn the open source workflow and thought process: create - package - share - clone - iterate - fork. 

Just one year of US public school teachers contributing learning materials, lesson plans, assignments, and assignment schedules into a central storehouse (or integrated storehouses) would build a digital open source - open education library deep enough to educate the world's children for generations to come.

- Once created and shared the iteration needed annually for each teacher becomes miniscule. 
- Creating and monitoring individual learning plans for our students becomes a possibility where it never has been before. 
- Data Science can be used to identify opportunities for early intervention with at risk students and intervene in a non-intrusive non-offensive way
- Learning materials can be optimized using data science to identify which are most effective and pair student learning style with student on a granular level
- Open source learning materials could reallocate a huge tax budget directly to teachers (in NC alone, 12M is budgeted for the 2020-201 school year to spend on mostly closed source copyrighted learning resources).

## Decoupling secure from public data
SchooListIt aims to decouple the secure student identifiable data from the pulic learning resource data in a system designed to facilitate parental oversight creating a revolutionary opportunity for parent-teacher cooperation. 

__What if our teachers could focus on the Students rather than content creation?__

1) Avoid Reinventing the Wheel - Use of powerful pre-existing platforms - learning content can be pulled via API integration from google classroom, the gsuite apps, or any wordpress or wordpress.com installation.
2) Communication Consolidation - a twilio enabled "channel changer" enabling the teacher to stay in one channel and communicate by meeting the parent on thier nominated channel.
3) Grow Virally from the Bottom Up - let's open up the data entry and give validated teachers a hand from the PTA Organizations. in 2020-2021 maybe room mom's enter the data into schoolistit instead of volunteer in the classroom.
7) Security - Decouple public data from secure data
8) Really inclusive - Really Public: Learning materials and pacing can be accessed by anyone anytime anywhere. 

# Architecture outline
<img src="https://github.com/megphillips91/schlistit/blob/master/Architecture-02.png" alt="schoolistit architecture" width="100%"/>

## Front End App: 
React - react router - react dom
you can scan the package.json file for all the packages used in the dev. 
user interface is all Material UI

### Data comes from: 
- user directly via the react app
- any WP install on WP.com or self hosted wp.org install via the free plugin to be published on repo (have written translation for draft.js to gutenberg) 
- google classroom via oauth

## BackEnd:
- Apache
- php
- cpanel
- mysql
currently hosted at InMotion Hosting on a VPS 2000

## Cloud Integrations:
### Google Maps: 
SchooListIt pulls school locations and details are pulled from Google Places. That information is then used in the "verification" of teachers. Once "verified" a teacher then gains control over all content and comments published to his (her) classroom and can then make use of the channel changer functionality to communicate with caregivers.

### Reading Aloud: 
SchooListIt needs to 'read aloud' any writted text to all kindergartners and children with learning disabilities
- Watson text to speech

### Channel Changer: 
Teachers and parents need to stay in one channel and be able to communicate with each other in each's most comfortable channel in order to facilitate easy and effective communicate. 
- (mailgun for now just because thats my familiar platform) sendgrid
- twilio voice
- twilio flex
- twilio SMS

## Data Science Gains:  
The gains in data science could be invaluable. SchooListIt needs a separate (very secure) back end into which SchooListIt can push praent, teacher, and student user behavior analytics and collate that data with student ID, testing, and grade information. For security, it makes sense for this to be an isolated system which also pulls from existing data sources including google classroom, wordpress, and SAAS systems like powerschool.

## National & Global Scaling:
The WordPress community is a global organization and activates quickly around an idea like this with legs.

There is a deep and global network of trainers ready to go in almost every community. They are able to teach teachers how to use WordPress and Gutenberg. Some are paid, some donate their time.  Most are contractors with flexible priorities. In addition, there is a ton of existing online content in addition to the official documentation on WP.org

Layering onto that, any school system that chooses to use the WP integration will benefit from the massive quantity of local WordPress agencies ready to troubleshoot and contribute code to customize and or integrate to any existing workflow. And help maintain the open source project. And the thousands of plugin integrations already built and availbale for school applications.

Furthermore, the WordPress organization maintains a group of well intended and charitable Polyglots ready to 'human' translate which could be used to further train a system like Watson's human speech in multiple languages. But also used to just human translate content for students needing non-english instruction.
