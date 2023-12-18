SED := sed -i -e

ifeq (${OS},Windows_NT)
	PROTOC_URL := https://github.com/protocolbuffers/protobuf/releases/download/v23.2/protoc-23.2-win64.zip
	PROTOC_GRPC_GATEWAY_URL := https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v2.15.2/protoc-gen-grpc-gateway-v2.15.2-windows-x86_64.exe
	PROTOC_GRPC_OPENAPI_V2_URL := https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v2.15.2/protoc-gen-openapiv2-v2.15.2-windows-x86_64.exe
else
	UNAME_S := $(shell uname -s)
	ifeq (${UNAME_S},Darwin)
		SED := sed -i ''
		ARCH_MAC := $(shell arch)
		ifeq (${ARCH_MAC},arm64)
			PROTOC_URL := https://github.com/protocolbuffers/protobuf/releases/download/v23.2/protoc-23.2-osx-aarch_64.zip
			PROTOC_GRPC_GATEWAY_URL := https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v2.15.2/protoc-gen-grpc-gateway-v2.15.2-darwin-arm64
			PROTOC_GRPC_OPENAPI_V2_URL := https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v2.15.2/protoc-gen-openapiv2-v2.15.2-darwin-arm64
		else
			PROTOC_URL := https://github.com/protocolbuffers/protobuf/releases/download/v23.2/protoc-23.2-osx-x86_64.zip
			PROTOC_GRPC_GATEWAY_URL := https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v2.15.2/protoc-gen-grpc-gateway-v2.15.2-darwin-x86_64
			PROTOC_GRPC_OPENAPI_V2_URL := https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v2.15.2/protoc-gen-openapiv2-v2.15.2-darwin-x86_64
		endif
	else
		PROTOC_URL := https://github.com/protocolbuffers/protobuf/releases/download/v23.2/protoc-23.2-linux-x86_64.zip
		PROTOC_GRPC_GATEWAY_URL := https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v2.15.2/protoc-gen-grpc-gateway-v2.15.2-linux-x86_64
		PROTOC_GRPC_OPENAPI_V2_URL := https://github.com/grpc-ecosystem/grpc-gateway/releases/download/v2.15.2/protoc-gen-openapiv2-v2.15.2-linux-x86_64
	endif
endif

PROTOC_FILE_NAME := $(shell basename ${PROTOC_URL} .zip)
PROTOC_GRPC_GATEWAY_FILE := $(shell basename ${PROTOC_GRPC_GATEWAY_URL})
PROTOC_GRPC_OPENAPI_V2_FILE := $(shell basename ${PROTOC_GRPC_OPENAPI_V2_URL})
PROTOC_DIR := ./thirdparty/${PROTOC_FILE_NAME}
PATH := ${PROTOC_DIR}/bin:./node_modules/.bin:${PATH}:../../node_modules/.bin

PROTOC := ${PROTOC_DIR}/bin/protoc
PROTOC_GRPC_GATEWAY_EXE := ${PROTOC_DIR}/bin/protoc-gen-grpc-gateway
PROTOC_GRPC_OPENAPI_V2_EXE := ${PROTOC_DIR}/bin/protoc-gen-openapiv2

ifeq (${OS},Windows_NT)
	PROTOC := ${PROTOC}.exe
	PROTOC_GRPC_GATEWAY_EXE := ${PROTOC_GRPC_GATEWAY_EXE}.exe
	PROTOC_GRPC_OPENAPI_V2_EXE := ${PROTOC_GRPC_OPENAPI_V2_EXE}.exe
endif

setup-protoc:
	mkdir -p ./thirdparty/sources/
	if [ -f "./thirdparty/sources/${PROTOC_FILE_NAME}.zip" ]; then \
		echo "./thirdparty/sources/${PROTOC_FILE_NAME}.zip already exists"; \
	else \
		curl -L ${PROTOC_URL} --output ./thirdparty/sources/${PROTOC_FILE_NAME}.zip; \
	fi;
	unzip ./thirdparty/sources/${PROTOC_FILE_NAME}.zip -d ${PROTOC_DIR}

	echo ${PROTOC_GRPC_GATEWAY_FILE}
	if [ -f "./thirdparty/sources/${PROTOC_GRPC_GATEWAY_FILE}" ]; then \
		echo "./thirdparty/sources/${PROTOC_GRPC_GATEWAY_FILE} already exists"; \
	else \
		curl -L ${PROTOC_GRPC_GATEWAY_URL} --output ./thirdparty/sources/${PROTOC_GRPC_GATEWAY_FILE}; \
	fi;
	cp ./thirdparty/sources/${PROTOC_GRPC_GATEWAY_FILE} ${PROTOC_GRPC_GATEWAY_EXE}
	chmod +x ${PROTOC_GRPC_GATEWAY_EXE}

	echo ${PROTOC_GRPC_OPENAPI_V2_FILE}
	if [ -f "./thirdparty/sources/${PROTOC_GRPC_OPENAPI_V2_FILE}" ]; then \
		echo "./thirdparty/sources/${PROTOC_GRPC_OPENAPI_V2_FILE} already exists"; \
	else \
		curl -L ${PROTOC_GRPC_OPENAPI_V2_URL} --output ./thirdparty/sources/${PROTOC_GRPC_OPENAPI_V2_FILE}; \
	fi;
	cp ./thirdparty/sources/${PROTOC_GRPC_OPENAPI_V2_FILE} ${PROTOC_GRPC_OPENAPI_V2_EXE}
	chmod +x ${PROTOC_GRPC_OPENAPI_V2_EXE}

clone-googleapis-protos:
	if [ -f "./thirdparty/sources/googleapis.zip" ]; then \
		echo "./thirdparty/sources/googleapis.zip already exists"; \
	else \
		curl -L https://github.com/googleapis/googleapis/archive/refs/heads/master.zip --output ./thirdparty/sources/googleapis.zip; \
	fi;
	unzip ./thirdparty/sources/googleapis.zip "googleapis-master/google/api/*" -d ./thirdparty/sources/
	cp -r ./thirdparty/sources/googleapis-master/google/api ${PROTOC_DIR}/include/google/api
	rm -r ./thirdparty/sources/googleapis-master

clone-grpc-gateway-protos:
	if [ -f "./thirdparty/sources/grpc-gateway-2.15.2.zip" ]; then \
		echo "./thirdparty/sources/grpc-gateway-2.15.2.zip already exists"; \
	else \
		curl -L https://github.com/grpc-ecosystem/grpc-gateway/archive/refs/tags/v2.15.2.zip --output ./thirdparty/sources/grpc-gateway-2.15.2.zip; \
	fi;
	unzip ./thirdparty/sources/grpc-gateway-2.15.2.zip -d ./thirdparty/sources/
	mkdir -p ${PROTOC_DIR}/include/protoc-gen-openapiv2
	cp -r ./thirdparty/sources/grpc-gateway-2.15.2/protoc-gen-openapiv2/options ${PROTOC_DIR}/include/protoc-gen-openapiv2/options
	# rm -r ./thirdparty/sources/grpc-gateway-2.15.2

install-node-packages:
	pnpm install

install-protoc:
	make setup-protoc
	make clone-googleapis-protos
	make clone-grpc-gateway-protos

uninstall-protoc:
	rm -rf ${PROTOC_DIR}

remove-thirdparty-sources:
	rm -rf ./thirdparty/sources

PROTO_ACTUAL_PATH := ${PWD}/src/protos
PROTO_PATH := ./src/protos

fix-proto-paths:
	${SED} 's+_pb.js"+_pb"+g' ${PROTO_PATH}/**/*.ts
	${SED} 's+../../..+@protos+g' ${PROTO_PATH}/**/*.ts

gen-proto-analysis:
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/common/common.db.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/analysis_management/analysis.student.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/analysis_management/analysis.teacher.apis.proto
	make fix-proto-paths

gen-proto-common:
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true  --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/user_management/ums.db.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/content_management/content.db.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/common/common.db.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/common/common.db.proto
	make fix-proto-paths

gen-proto-cms:
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true  --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.db.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true  --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/user_management/ums.db.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true  --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/content_management/content.common.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true  --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/content_management/content.db.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true  --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/content_management/cms.content.apis.proto
	make fix-proto-paths

gen-proto-lms:
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.db.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.school.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.common.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.book.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.student.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.teacher.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.lesson.common.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.hw.student.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.hw.teacher.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.hw.common.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.lesson.teach.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/learning_management/lms.lesson.learn.apis.proto
	make fix-proto-paths

gen-proto-school:
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/school_management/school.db.proto
	make fix-proto-paths

gen-proto-subscription:
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/subscription_management/subscription.db.proto
	make fix-proto-paths

gen-proto-ums:
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/common/common.db.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/user_management/ums.db.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/user_management/ums.common.apis.proto
	${PROTOC} -I. -I ${PROTO_ACTUAL_PATH} --openapiv2_out . --openapiv2_opt logtostderr=true --es_out . --es_opt target=ts --connect-es_out . --connect-es_opt target=ts ${PROTO_PATH}/user_management/ums.login.apis.proto
	make fix-proto-paths

gen-proto:
	make gen-proto-analysis
	make gen-proto-common
	make gen-proto-cms
	make gen-proto-lms
	make gen-proto-school
	make gen-proto-subscription
	make gen-proto-ums

clean-proto-common:
	rm -rf ${PROTO_PATH}/common/*_connect.ts
	rm -rf ${PROTO_PATH}/common/*_pb.ts

clean-proto-all:
	rm -rf ${PROTO_PATH}/*/*_connect.ts
	rm -rf ${PROTO_PATH}/*/*.swagger.json
	rm -rf ${PROTO_PATH}/*/*_pb.ts

run-swagger-cli:
	./node_modules/.bin/swagger-ui ${file}
