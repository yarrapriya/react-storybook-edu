gen-proto:
	cd ./libs/api-protos && make gen-proto

gen-proto-analysis:
	cd ./libs/api-protos && make gen-proto-analysis

gen-proto-common:
	cd ./libs/api-protos && make gen-proto-common

gen-proto-cms:
	cd ./libs/api-protos && make gen-proto-cms

gen-proto-lms:
	cd ./libs/api-protos && make gen-proto-lms

gen-proto-misc:
	cd ./libs/api-protos && make gen-proto-misc

gen-proto-school:
	cd ./libs/api-protos && make gen-proto-school

gen-proto-subscription:
	cd ./libs/api-protos && make gen-proto-subscription

gen-proto-ums:
	cd ./libs/api-protos && make gen-proto-ums


install-protoc:
	cd ./libs/api-protos && make install-protoc

clean-proto-all:
	cd ./libs/api-protos && make clean-proto-all

fix-json-fromat:
	cp ./thirdparty/buf/json-format-proto3.js ./node_modules/@bufbuild/protobuf/dist/cjs/private/

run-swagger-cli:
	./node_modules/.bin/swagger-ui ${file}

build-student:
	./node_modules/.bin/nx build student

build-teacher:
	./node_modules/.bin/nx build teacher

build-student-local:
	NX_GENEO_BACKEND_URL="https://localhost" NX_GENEO_ENV="dev" ./node_modules/.bin/nx build  --skip-nx-cache student

build-teacher-local:
	NX_GENEO_BACKEND_URL="https://localhost" NX_GENEO_ENV="dev" ./node_modules/.bin/nx build  --skip-nx-cache teacher

build-student-dev2:
	NX_GENEO_BACKEND_URL="https://dev2-api.geneo.in" NX_GENEO_ENV="dev" ./node_modules/.bin/nx build  --skip-nx-cache student

build-teacher-dev2:
	NX_GENEO_BACKEND_URL="https://dev2-api.geneo.in" NX_GENEO_ENV="dev" ./node_modules/.bin/nx build  --skip-nx-cache teacher

build-student-stage:
	NX_GENEO_BACKEND_URL="https://dev3-api.geneo.in" NX_GENEO_ENV="stage" ./node_modules/.bin/nx build  --skip-nx-cache student

build-teacher-stage:
	NX_GENEO_BACKEND_URL="https://dev3-api.geneo.in" NX_GENEO_ENV="stage" ./node_modules/.bin/nx build  --skip-nx-cache teacher

build-student-prod:
	NX_GENEO_BACKEND_URL="https://api.geneo.in" NX_GENEO_ENV="prod" ./node_modules/.bin/nx build --skip-nx-cache student

build-teacher-prod:
	NX_GENEO_BACKEND_URL="https://api.geneo.in" NX_GENEO_ENV="prod" ./node_modules/.bin/nx build --skip-nx-cache teacher

# After the build and scp, copy those files to /home/frontend/websites/teach-test for teacher test deployment
scp-teacher-build-to-dev:
	scp -r ./dist/apps/teacher frontend@dev1-web.geneo.in:"~/builds/geneo2.0/teacher/`whoami`_build_teacher`date +"%Y-%m-%dT%H:%M:%S"`"

# After the build and scp, copy those files to /home/frontend/websites/learn-test for student test deployment
scp-student-build-to-dev:
	scp -r ./dist/apps/student frontend@dev1-web.geneo.in:"~/builds/geneo2.0/student/`whoami`_build_student`date +"%Y-%m-%dT%H:%M:%S"`"

deploy-to-firebase-learn-stage:
	./node_modules/.bin/firebase deploy --only hosting:learn-stage-geneo

deploy-to-firebase-teach-stage:
	./node_modules/.bin/firebase deploy --only hosting:teach-stage-geneo

deploy-to-firebase-learn-prod:
	./node_modules/.bin/firebase deploy --only hosting:learn-prod-geneo

deploy-to-firebase-teach-prod:
	./node_modules/.bin/firebase deploy --only hosting:teach-prod-geneo
